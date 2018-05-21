const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb://localhost/test', function(err){
	if (err) throw err;
	console.log('Successful connected on mongodb!');
});
const userSchema = mongoose.Schema({
	username: String
});
const User = mongoose.model('User', userSchema);
// const user = new User({
// 	username: "Allen" + Math.random().toString().substring(0, 5)
// });
// user.save(function(err){
// 	if (err) throw err;
// 	console.log('User successfully saved.');
// });

const app = express();
app.listen('9093', function(err){
	console.log("Successful connected on 9000!");
});

app.get('/data', function(req, resp) {
	User.findOne({})
		.then((res) => {
			resp.send(res);
		})
		.catch((err) => {
			console.log(err);
		})
});