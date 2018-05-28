const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Chat = model.getModel('chat');

io.on('connection', function(socket) {
	console.log('user login');
	socket.on('sendmsg', function(data){
		const {from , to , msg} = data;
		const chatId = [from, to].sort().join('_');
		Chat.create({chatId, from , to, content: msg, createTime: new Date().getTime()}, function(err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc));
		});
	})
});

const userRouter = require('./user');
const chatRouter = require('./chat');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/chat', chatRouter);

server.listen('9093', function(err){
	console.log("Successful connected to server on 9093.");
});
