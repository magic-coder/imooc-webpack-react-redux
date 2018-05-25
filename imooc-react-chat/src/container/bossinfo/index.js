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
class BossInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			company: '',
			money: '',
			avatar: ''
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
				<NavBar mode="dark">I'm Boss</NavBar>
				<AvatarSelector selectAvatar={
					(el) => this.setState({avatar: el.text})
				}/>
				<List>
					<InputItem clear={true}
										 onChange={(v) => this.handleOnChange('title', v)}>title</InputItem>
					<TextareaItem clear={true} title="description" rows={2}
												onChange={(v) => this.handleOnChange('description', v)}/>
					<InputItem clear={true}
										 onChange={(v) => this.handleOnChange('company', v)}>company</InputItem>
					<InputItem clear={true}
										 onChange={(v) => this.handleOnChange('money', v)}>money</InputItem>
				</List>
				<WhiteSpace size="xl"/>
				<Button type="primary" onClick={() => this.props.doUpdateAction(this.state)}>Save</Button>
			</div>
		)
	}
}

export default BossInfo;