import React from 'react';
import ReactDOM from 'react-dom';
import Login from './container/login/index';
import Register from './container/register/index';
import BossInfo from './container/bossinfo/index';
import AuthRoute from './component/AuthRoute';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f)
);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<AuthRoute />
						<Switch>
							<Route path="/login" component={Login}/>
							<Route path="/register" component={Register}/>
							<Route path="/bossinfo" component={BossInfo}/>
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
