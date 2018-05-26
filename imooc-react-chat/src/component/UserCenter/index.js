import React from 'react';
import { Result, List, WhiteSpace, WingBlank, Modal } from 'antd-mobile';

import { connect } from 'react-redux';
import { doLogout } from '../../redux/user.redux';
import cookies from 'browser-cookies';
import { withRouter } from 'react-router-dom';

@connect(
	state=>(state.user),
	{ doLogout }
) @withRouter
class UserCenter extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(e) {
		const alert = Modal.alert;
		alert('Logout', 'Are you sure???', [
			{ text: 'Cancel', onPress: () => console.log('cancel') },
			{ text: 'Ok', onPress: () => {
					cookies.erase('userId');
					new Promise((resolve ,reject) => {
						this.props.doLogout(resolve, reject);
					}).then(resp => {
						if (resp === true) {
							this.props.history.push('/login');
						}
					}).catch(err => {
						console.log(err);
					});
				}
			},
		])
	}

	render() {
		return (
			<div>
				{
					this.props.user ?
						(
							<div>
								<WingBlank>
									<Result
										imgUrl={require(`../img/avatar/${this.props.avatar}.png`)}
										title={this.props.user}
									/>
									<List renderHeader={"About Me"}>
										<List.Item multipleLine>
											{this.props.title}
											{this.props.desc.split('\n').map((line) => (<div key={Date.now+Math.random()}>{line}</div>))}
											{this.props.money?<List.Item.Brief>Salary:{this.props.money}</List.Item.Brief>:null}
										</List.Item>
									</List>
									<WhiteSpace/>
									<List>
										<List.Item onClick={this.handleLogout}>Logout</List.Item>
									</List>
								</WingBlank>
							</div>
						) : null
				}
			</div>
		);
	}
}

export default UserCenter;
