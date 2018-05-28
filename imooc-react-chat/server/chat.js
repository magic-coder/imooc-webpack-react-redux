const express = require('express');
const Router = express.Router();
const model = require('./model');

const Chat = model.getModel('chat');


module.exports = Router;
