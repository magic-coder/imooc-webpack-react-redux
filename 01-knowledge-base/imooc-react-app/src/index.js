import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { gunReducer } from './index.redux';

// gun's store
const store = createStore(gunReducer, compose(
  applyMiddleware(thunk), 
  window.devToolsExtension ? window.devToolsExtension() : () => {})
);

ReactDom.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ), 
  document.getElementById('root'));