import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { doGetMegList, doSendMsg, doRecvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from "../../util";

@connect(
	state=>state,
	{ doGetMegList, doSendMsg, doRecvMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			msg:[],
			showEmoji: false};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.doGetMegList();
			this.props.doRecvMsg();
		}
	}

	componentWillUnmount() {
		const to = this.props.match.params.chatId;
		this.props.readMsg(to);
	}

	fixCarousel() {
		setTimeout(function() {
			window.dispatchEvent(new Event('resize'));
		}, 0)
	}

	handleSubmit() {
		const from = this.props.user._id;
		const to = this.props.match.params.chatId;
		const msg = this.state.text;
		this.props.doSendMsg({from, to, msg});
		this.setState({
			text: ''
		});
	}

	render(){
		const emojis = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
			.split(' ')
			.filter(v=>v)
			.map(v=>({text:v}));
		const chatId = this.props.match.params.chatId;
		const Item = List.Item;
		const users = this.props.chat.users;
		if (!users[chatId]) {
			return null;
		}
		let chatmsg;
		if (this.props.chat.chatmsg) {
			chatmsg = this.props.chat.chatmsg.filter(v => {
				// console.log(v.chatId, getChatId(chatId, this.props.user._id), v.chatId === getChatId(chatId, this.props.user._id));
				return v.chatId === getChatId(chatId, this.props.user._id);
			});
		} else {
			return null;
		}
		return (
			<div id='chat-page'>
				<NavBar
					mode='dark'
					icon={<Icon type={"left"}/>}
					onLeftClick={() => {this.props.history.goBack()}}
				>
					{
						users[chatId].name
					}
				</NavBar>
				<List>
				{
					chatmsg ?
						chatmsg.map(v => {
							const avatar = require(`../img/avatar/${users[v.from].avatar}.png`);
							return v.from === chatId?
								(<List key={v._id+Math.random()}>
										<Item thumb={avatar}>{v.content}</Item>
									</List>)
								:
								(<List key={v._id+Math.random()}>
									<Item extra={<img src={avatar} alt={'avatar'}/>} className='chat-me'>{v.content}</Item>
								</List>)
							}
						)
					: null
				}
				</List>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='please input'
							value={this.state.text}
							onChange={v=>this.setState({text:v})}
							extra={
								<div>
									<span
										style={{marginRight: 10}}
										onClick={()=> {
											this.setState(
												{showEmoji:!this.state.showEmoji}
											);
											this.fixCarousel();
										}}>{'😀'}</span>
									<span onClick={() => this.handleSubmit()}>Submit</span>
								</div>
							}/>
					</List>
					{
						this.state.showEmoji ?
							<Grid data={emojis} columnNum={9} carouselMaxRow={4} isCarousel={true}
										onClick={(el) => this.setState({text: this.state.text + el.text})}/> :
							null
					}
				</div>
			</div>
		)
	}
}

export default Chat;
