import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

// define action
const DISPLAY_CHATTING_LIST = 'display_chatting_list';
// 获取聊天列表
const MSG_LIST = 'msg_list';
// 读取信息
const MSG_RECV = 'msg_recv';
// 标示已读
const MSG_READ = 'msg_read';

// create action
function displayChattingListAction(state) {
	return {
		type: DISPLAY_CHATTING_LIST,
		payload: state
	}
}

function msgList(msgs, users, userId) {
	return {
		type: MSG_LIST,
		payload: { msgs, users, userId }
	}
}

function msgRecv(msg, userId) {
	return {type: MSG_RECV, payload: msg, userId};
}

// do action
export function doDisplayChattingListAction(type) {
	return display => {
		axios.get(`/user/list?type=${type}`)
			.then((resp) => {
				display(displayChattingListAction({ chattingList: resp.data }));
			})
			.catch(err => {
				console.log(err);
			});
	}
}

export function doGetMegList() {
	return (dispatch, getState) => {
		axios.get('/user/getmsglist')
			.then(res => {
				if (res.status === 200 && res.data.code === true) {
					const userId = getState().user._id;
					dispatch(msgList(res.data.msgs, res.data.users, userId));
				}
			})
	}
}

export function doSendMsg({from, to, msg}) {
	return dispatch => {
		socket.emit('sendmsg', {from , to, msg});
	}
}

export function doRecvMsg() {
	return (dispatch, getState) => {
		socket.on('recvmsg', function(data) {
			const userId = getState().user._id;
			dispatch(msgRecv(data, userId));
		})
	}
}

function msgRead({from, userId , number}) {
	return {
		type: MSG_READ,
		payload: {from, userId, number}
	}
}

export function readMsg(from) {
	return (dispatch, getState) => {
		axios.post('/user/readmsg', {from})
			.then(res=> {
				const userId = getState().user._id;
				if (res.status === 200 && res.data.code === true) {
					dispatch(msgRead({userId, from, number: res.data.n}));
				}
			})
	}
}

// dispatch action
const initState = {
	chattingList: [],
	chatmsg: [],
	unread: 0,
	users: {}
};
function chat(state=initState, action) {
	const { type, payload } = action;
	switch (type) {
		case DISPLAY_CHATTING_LIST:
			return {...state, ...payload};
		case MSG_LIST:
			return {...state,
				chatmsg: action.payload.msgs,
				users: action.payload.users,
				unread: action.payload.msgs.filter(v=> !v.read && v.to === action.payload.userId).length};
		case MSG_RECV:
			const n = action.payload.to === action.userId? 1: 0;
			return {...state, chatmsg: [...state.chatmsg, action.payload], unread:state.unread + n};
		case MSG_READ:
			const { from , number } = action.payload;
			return {...state, chatmsg : state.chatmsg.map(v=>({...v, read: (from === v.from? true: v.read)})), unread: state.unread - number};
		default:
			return state;
	}
}

export default chat;
