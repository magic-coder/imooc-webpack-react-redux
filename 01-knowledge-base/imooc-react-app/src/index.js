import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { gunReducer, addGun, reduceGun, addGunAsync } from './index.redux';

// gun's store
const store = createStore(gunReducer, applyMiddleware(thunk));

function render(){
  ReactDom.render(<App store={store} addGun={addGun} reduceGun={reduceGun} addGunAsync={addGunAsync}/>, document.getElementById('root'));
}

store.subscribe(render);

render();