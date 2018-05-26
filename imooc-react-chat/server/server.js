const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.listen('9093', function(err){
	console.log("Successful connected to server on 9093.");
});
