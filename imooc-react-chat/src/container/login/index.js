import React from 'react';
import Logo from '../../component/Logo';
import { List, InputItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';

import { connect } from 'react-redux';
import { doLoginAction } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
	state => (state.user),
	{ doLoginAction }
)
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: '',
			errorStateMsg: '',
		};
	}

	handleInputChange = (name, value) => {
		this.setState({
			[name]: value
		});
	};

	handleLogin = () => {
		this.props.doLoginAction(this.state);
	};

	render() {
		return (
			<div>
				{
					this.props.redirectTo ?
						<Redirect to={this.props.redirectTo} /> :
						null
				}
				<Logo />
				<div style={{ width: '100%', height: '25px', color: 'red', textAlign: 'center' }}>
					{this.state.errorStateMsg || this.props.errorLoginMsg}
				</div>
				<WhiteSpace />
				<WingBlank size="md">
					<List>
						<InputItem clear placeholder="Your Name" onChange={(v) => this.handleInputChange('user', v)}/>
						<WhiteSpace />
						<InputItem clear type="password" placeholder="Password" onChange={(v) => this.handleInputChange('pwd', v)}/>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={() => this.handleLogin()}>Login</Button>
					<WhiteSpace />
					<Button type="primary" onClick={() => this.props.history.push('/register')}>Register</Button>
				</WingBlank>
			</div>
		);
	}
}

export default Login;
