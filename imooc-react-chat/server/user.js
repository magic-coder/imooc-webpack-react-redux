const express = require('express');
const Router = express.Router();
const model = require('./model');
const { md5Pwd } = require('./util');

const User = model.getModel('user');
const Chat = model.getModel('chat');

Router.get('/list',function(req, res){
	User.find(req.query, function(err,doc){
		return res.json(doc)
	})
});

Router.post('/register',function(req, resp){
	const {user, pwd, type} = req.body;
	User.findOne({user: user}, function(err, doc) {
		if (err)
			resp.send({code: false, errorRegisterMsg: "server error"});
		else {
			if (!doc) {
				User.create({user, pwd: md5Pwd(pwd), type}, function(err, doc) {
					if (err)
						resp.send({code: false, errorRegisterMsg: "server error"});
					resp.cookie('userId', doc._id);
					const {pwd, ...obj} = doc._doc;
					resp.send({code: true, user: obj});
				});
			} else {
				resp.send({code: false, errorRegisterMsg: "UserCenter already exists."});
			}
		}
	});
});

Router.post('/login', function(req, resp) {
	const {user, pwd} = req.body;
	User.findOne({user: user}, function(err, doc) {
		if (err)
			resp.send({code: false, errorLoginMsg: "server error"});

		if (doc && doc.pwd === md5Pwd(pwd)) {
			resp.cookie('userId', doc._id);
			const {pwd, ...obj} = doc._doc;
			resp.send({code: true, user: obj});
		} else if (!doc){
			resp.send({code: false, errorLoginMsg: "UserCenter does not exist. Please register."});
		} else if (doc && doc.pwd !== md5Pwd(pwd)) {
			resp.send({code: false, errorLoginMsg: "Incorrect password."});
		} else {
			resp.send({code: false, errorLoginMsg: "Unknown reasons."});
		}
	})
});

Router.get('/info', function(req, resp) {
	const userId = req.cookies.userId;
	User.findOne({_id: userId}, function(err, doc) {
		if (doc && doc._id.toString() === userId) {
			const {pwd, ...obj} = doc._doc;
			resp.send({code: true, user: obj});
		} else {
			resp.send({code: false});
		}
	});
});

Router.post('/update', function(req, resp) {
	const userId = req.cookies.userId;
	User.findByIdAndUpdate({_id: userId}, req.body, {new: true}, function(err, doc) {
		if (doc && doc._id.toString() === userId) {
			const {pwd, ...obj} = doc._doc;
			resp.send({code: true, user: obj});
		} else {
			resp.send({code: false});
		}
	})
});

Router.get('/getmsglist', function(req, res) {
	const user = req.cookies.userId;
	let users = {};
	User.find({}, function(e, userdoc) {
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar: v.avatar};
		})
	});
	Chat.find({'$or': [{from:user}, {to:user}]}, function(err, docs) {
		if (!err) {
			return res.json({code: true, msgs:docs, users: users})
		}
	})
});

Router.post('/readmsg', function(req, res) {
	const userId = req.cookies.userId;
	const { from } = req.body;
	Chat.update(
		{from, to: userId},
		{'$set': {read: true}},
		{'multi': true},
		function(err, doc){
		if (!err) {
			return res.json({code: true, n: doc.nModified});
		}
		return res.json({code: false, msg: 'fail'});
	});
});

module.exports = Router;
