import React from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserLogin } from '../../redux/user.redux';
import { getRedirectUrl } from  '../../util';

@withRouter
@connect(
	state=>({user:state.user}),
	{ isUserLogin }
)
export default class AuthRoute extends React.Component {
	componentDidMount() {
		const publicRoutes = ['/register', '/login'];
		if (publicRoutes.indexOf(this.props.location.pathname) > -1) {
			return null;
		}
		const promise = new Promise((resolve, reject) => {
			this.props.isUserLogin(resolve, reject);
		});
		promise.then(() => {
			const user = this.props.user;
			if (user.isAuth === true) {
				const pathname = this.props.location.pathname;
				if (pathname === '/') {
					const redirectTo = getRedirectUrl(user);
					this.props.history.push(redirectTo);
				} else {
					this.props.history.push(pathname);
				}
			} else {
				this.props.history.push('/login');
			}
		});
	}

	render() {
		return null;
	}
}
