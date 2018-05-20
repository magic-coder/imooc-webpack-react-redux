import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from  'react-router-dom';
import { gunReducer } from './index.redux';

// gun's store
const store = createStore(gunReducer, compose(
  applyMiddleware(thunk), 
  window.devToolsExtension ? window.devToolsExtension() : () => {})
);

function ErYing(props) {
  return (
    <div>
      erlian
    </div>
  );
}

function QiBingLian() {
  return (
    <div>
      qibinglian
    </div>
  );
}

ReactDom.render(
  (
    <Provider store={store}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">YiYing</Link>
            </li>
            <li>
              <Link to="/erying">ErYing</Link>
            </li>
            <li>
              <Link to="/qibinglian">QiBingLian</Link>
            </li>
          </ul>
          <Route path='/' exact component={App} />
          <Route path='/erying' component={ErYing} />
          <Route path='/qibinglian' component={QiBingLian} />
        </div>
      </Router>
    </Provider>
  ), 
  document.getElementById('root'));