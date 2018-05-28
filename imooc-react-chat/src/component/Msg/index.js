import React from 'react';
import { List, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { doGetMegList, doSendMsg, doRecvMsg } from '../../redux/chat.redux';

@connect(
	state=>state,
	{ doGetMegList, doSendMsg, doRecvMsg }
)
class Msg extends React.Component {

	getLast(arr){
		return arr[arr.length - 1];
	}

	render() {
		const Item = List.Item;
		const Brief = Item.Brief;
		const msgGroup = {};
		const userId = this.props.user._id;
		this.props.chat.chatmsg.forEach(v => {
			msgGroup[v.chatId] = msgGroup[v.chatId] || [];
			msgGroup[v.chatId].push(v);
		});
		const userInfo = this.props.chat.users;
		const chatList = Object.values(msgGroup).sort((a, b) => {
			const a_last = this.getLast(a).createTime;
			const b_last = this.getLast(b).createTime;
			return b_last- a_last;
		});
		return (
			<div>
				<List>
					{
						chatList.map(v => {
							const lastItem = this.getLast(v);
							const targetId = v[0].from === userId ? v[0].to : v[0].from;
							const name = userInfo[targetId]? userInfo[targetId].name : null;
							const avatar = userInfo[targetId]? userInfo[targetId].avatar : null;
							const unreadNum = v.filter(x=> {
								// console.log(x.to === userId, x.to, userId);
								return !x.read && x.to === userId
							}).length;
							// console.log(unreadNum);
							return (
								<Item
									extra={<Badge text={unreadNum}></Badge>}
									key={lastItem._id}
									thumb={require(`../img/avatar/${avatar}.png`)}
									onClick={() => {
										this.props.history.push(`/chat/${targetId}`)
									}}
									>
									{lastItem.content}
									<Brief>{name}</Brief>
								</Item>
							)
						})
					}
				</List>
			</div>
		);
	}
}

export default Msg;