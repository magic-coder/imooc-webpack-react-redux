import React from 'react';
import ReactDOM from 'react-dom';
import Login from './container/login/index';
import Register from './container/register/index';
import BossInfo from './container/bossinfo/index';
import GeniusInfo from './container/geniusinfo/index';
import AuthRoute from './component/AuthRoute';
import Dashboard from './container/dashboard/index'
import './index.css';
import './config';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension? window.devToolsExtension():f=>f)
);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<AuthRoute />
						<Switch>
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/bossinfo" component={BossInfo} />
							<Route path="/geniusinfo" component={GeniusInfo} />
							<Route component={Dashboard} />
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
