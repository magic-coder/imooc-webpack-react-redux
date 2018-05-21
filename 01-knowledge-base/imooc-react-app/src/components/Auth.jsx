import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { login, getUserData } from '../redux/auth.redux';
// import axios from 'axios';

@connect(
	state => ({auth: state.auth}),
	{ login, getUserData }
)
class Auth extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		data: []
	// 	}
	// }
	//
	componentDidMount() {
		this.props.getUserData();
		// axios.get('/data')
		// 	.then(res => {
		// 		if (res.status === 200) {
		// 			console.log(res.data);
		// 			this.setState({data: res.data});
		// 		}
		// 	})
	}

	render() {
		return (
			<div>
				<h1>My name is {this.props.auth.username}</h1>
				{
					this.props.auth.isLogin ?
						<Redirect to='/dashboard'/> : null
				}
				<h3>You don't have priviledge. Plese login.</h3>
				<button onClick={() => this.props.login()}>login</button>
			</div>
		)
	}
}

export default Auth;
