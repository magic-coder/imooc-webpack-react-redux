import React from 'react'
import UserCard from '../UserCard/index';

import { connect } from 'react-redux';
import { doDisplayChattingListAction } from '../../redux/chat.redux';

@connect(
	state=>state.chat,
	{ doDisplayChattingListAction }
)
class Genius extends React.Component {
	componentDidMount() {
		this.props.doDisplayChattingListAction('genius');
	}

	render() {
		const chattingList = this.props.chattingList.filter(c => c.avatar);
		return (
			<div>
				{
					chattingList.map((c) =>  (<UserCard key={c._id} chat={c}/>))
				}
			</div>
		)
	}
}

export default Genius;
