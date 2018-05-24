// connect mongodb
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(url, function(err){
	if (err) throw err;
	console.log('Successful connected to mongodb on 27017.');
});

// define models by schema
const models = {
	user : {
		'user'			:			{ type:String, 'require':true },
		'pwd'				:			{ type:String, 'require':true },
		'type'			:			{ type:String, 'require':true },
		'avatar'		:			{ type:String },
		'title'			:			{ type:String },
		'desc'			:			{ type:String },
		'company'		:			{ type:String },
		'money'			:			{ type:String }
	},
	chat : {

	}
};

// register models by schema
Object.entries(models).forEach((entry, schema) => {
	mongoose.model(entry[0], new mongoose.Schema(entry[1]));
});

module.exports = {
	getModel: function(name) {
		return mongoose.model(name);
	}
};




