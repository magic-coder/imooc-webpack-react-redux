import React from 'react';
import {NavBar, List, TextareaItem, InputItem, Button, WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../component/AvatarSelector/index';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { doUpdateAction } from '../../redux/user.redux';

@connect(
	state=>state.user,
	{ doUpdateAction }
)
class GeniusInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: '',
			title: '',
			description: '',
		}
	}

	handleOnChange(k, v) {
		this.setState({
			[k]: v
		});
	}

	render() {
		const path = this.props.location.pathname;
		const redirectTo = this.props.redirectTo;
		return (
			<div>
				{redirectTo && redirectTo !== path? <Redirect to={this.props.redirectTo} /> : null}
				<NavBar mode="dark">I'm Genius</NavBar>
				<AvatarSelector selectAvatar={
					(el) => this.setState({avatar: el.text})
				}/>
				<List>
					<InputItem clear={true}
										 onChange={(v) => this.handleOnChange('title', v)}>Seek</InputItem>
					<TextareaItem clear={true} title="summary" rows={2}
												onChange={(v) => this.handleOnChange('description', v)}/>
				</List>
				<WhiteSpace size="xl"/>
				<Button type="primary" onClick={() => this.props.doUpdateAction(this.state)}>Save</Button>
			</div>
		)
	}
}

export default GeniusInfo;
