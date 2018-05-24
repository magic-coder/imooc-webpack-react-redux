import React from 'react';
import Logo from '../../component/Logo';
import { List, InputItem, WhiteSpace, Radio, Button, WingBlank } from 'antd-mobile';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { doRegisterAction } from '../../redux/user.redux';

@connect(
	state=>(state.user),
	{ doRegisterAction }
)
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: '',
			type: 'boss',
			avatar: '',
			errorStateMsg: '',
		};
	}

	handleInputChange = (name, value) => {
		this.setState({
			[name]: value
		});
	};

	handleConfirmPwd = (value) => {
		if (this.state.pwd !== value) {
			this.setState({
				errorStateMsg: 'The passwords are not equal.'
			})
		} else {
			this.setState({
				errorStateMsg: ''
			})
		}
	};

	handleRegister() {
		return this.props.doRegisterAction(this.state);
	}

	render() {
		return (
			<div>
				{
					this.props.redirectTo ?
						<Redirect to={this.props.redirectTo} /> :
						null
				}
				<Logo />
				<form>
				<div style={{ width: '100%', height: '25px', color: 'red', textAlign: 'center' }}>
					{ this.state.errorStateMsg || this.props.errorRegisterMsg }
				</div>
				<WingBlank size="md">
					<List>
						<InputItem clear placeholder="Your Name"
											 onChange={(v) => this.handleInputChange('user', v)}/>
						<WhiteSpace />
						<InputItem clear type="password" placeholder="Password"
											 onChange={(v) => this.handleInputChange('pwd', v)}/>
						<InputItem clear type="password" placeholder="Re-enter password"
											 onChange={(v) => this.handleConfirmPwd(v)}/>
					</List>
					<Radio.RadioItem checked={this.state.type.toString() === 'boss'}
													 onClick={(v) => this.handleInputChange('type', 'boss')}>Boss</Radio.RadioItem>
					<Radio.RadioItem checked={this.state.type.toString() === 'genius'}
													 onClick={(v) => this.handleInputChange('type', 'genius')}>Genius</Radio.RadioItem>
					<WhiteSpace />
					<Button type="primary" onClick={() => this.handleRegister()}>Register</Button>
					<WhiteSpace />
					<Button type="primary" onClick={() => this.props.history.push('/login')}>Login</Button>
				</WingBlank>
				</form>
			</div>
		);
	}
}

export default Register;
