import React from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './redux/reducer';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import'./config';

// gun's store
const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : () => {
	})
);

/**
 * login
 * - without login, redirect to login page
 * index
 * - navigator + display + logout
 * - yiying erying qibinglian
 * Auth
 * Dashboard
 */
ReactDom.render(
	(
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path='/login' exact component={Auth}/>
					<Route path='/dashboard' component={Dashboard}/>
					<Redirect to='/dashboard'/>
				</Switch>
			</Router>
		</Provider>
	),
	document.getElementById('root')
);
