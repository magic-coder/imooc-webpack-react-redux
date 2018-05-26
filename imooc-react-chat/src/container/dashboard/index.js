import React from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import Boss from '../../component/Boss/index';
import Genius from '../../component/Genius/index';
import Msg from '../../component/Msg/index';
import UserCenter from '../../component/UserCenter/index';

import { connect } from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom'

@connect(
	state=>state.user,
	{ connect }
)
@withRouter
class Dashboard extends React.Component {
	render() {
		const type = this.props.type;
		let navLinks = [
			{
				path: '/boss',
				icon: 'boss',
				text: 'boss',
				title: 'Genius List',
				hidden: type === 'genius',
				component: Genius,
			},
			{
				path: '/genius',
				icon: 'job',
				text: 'genius',
				title: 'Boss List',
				hidden: type === 'boss',
				component: Boss,
			},
			{
				path: '/message',
				title: 'Message',
				icon: 'msg',
				hidden: false,
				component:Msg
			},
			{
				path: '/me',
				title: 'Me',
				icon: 'user',
				hidden: false,
				component:UserCenter
			},
		];
		const { pathname } = this.props.location;
		navLinks = navLinks.filter((n) => n.hidden === false);
		return (
			<div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
				<TabBar>
					{
						navLinks.map((navLink) => {
							return (
								<TabBar.Item
									key={navLink.path}
									title={navLink.title}
									icon={{uri:require(`../../component/img/navlink/${navLink.icon}.png`)}}
									selectedIcon={{uri:require(`../../component/img/navlink/${navLink.icon}-active.png`)}}
									selected={pathname === navLink.path}
									onPress = {
										() => {
											this.props.history.push(navLink.path);
										}
									}
								>
									<NavBar mode="dark">{navLink.title}</NavBar>
									<div style={{marginTop:45}}>
										<Switch>
											{
												navLinks.map(v=>(
													<Route key={v.path} path={v.path} component={v.component} />
												))
											}
										</Switch>
									</div>
								</TabBar.Item>)
						})
					}
				</TabBar>
			</div>
		);
	}
}

export default Dashboard;
