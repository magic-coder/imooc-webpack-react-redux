import React from 'react'
import UserCard from '../UserCard/index';

import { connect } from 'react-redux';
import { doDisplayChattingListAction } from '../../redux/chat.redux';

@connect(
	state=>state.chat,
	{ doDisplayChattingListAction }
)
class Boss extends React.Component {
	componentDidMount() {
		this.props.doDisplayChattingListAction('boss');
	}

	render() {
		const chattingList = this.props.chattingList;
		return (
			<div>
				{
					chattingList.filter(c => c.avatar).map((c) => (<UserCard key={c._id} chat={c}/>))
				}
			</div>
		)
	}
}

export default Boss;
