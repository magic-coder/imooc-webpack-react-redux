import React from 'react';
import  { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
	handleClick(chat) {
		this.props.history.push(`/chat/${chat._id}`);
	}

	render() {
		const chat = this.props.chat;
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card key={chat._id} onClick={() => this.handleClick(chat)}>
						<Card.Header
							title={chat.user}
							thumb={require(`../img/avatar/${chat.avatar}.png`)}
							extra={<span>{chat.title}</span>}
						/>
						<Card.Body>
							<div>{
								chat.desc.split('\n')
									.map((line) =>
										(<div key={chat._id+Math.random()}>{line}</div>)
									)}
							</div>
						</Card.Body>
						{ chat.money? <Card.Footer content="footer content"/> : null }
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
			</div>
		)
	}
}

export default UserCard;
