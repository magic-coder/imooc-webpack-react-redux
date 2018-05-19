import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import gunStore from './index.redux';
import { addGun, reduceGun, addGunAsync } from './index.redux';

function render(){
  ReactDom.render(<App store={gunStore} addGun={addGun} reduceGun={reduceGun} addGunAsync={addGunAsync}/>, document.getElementById('root'));
}

gunStore.subscribe(render);

render();