import React from 'react';
import { connect } from 'react-redux';
import { addGun, reduceGun, addGunAsync } from './index.redux';


@connect(
 state => ({ num : state }), // state mapping to props 
 { addGun, reduceGun, addGunAsync } // auto-dispatch actions mapping to props
)
class App extends React.Component {
 render() {
  return (
   <div>
    <h1>How many guns? {this.props.num}</h1>
    <button onClick={() => this.props.addGun()}>Apply Gun</button>
    <button onClick={() => this.props.reduceGun()}>Take Away Gun</button>
    <button onClick={() => this.props.addGunAsync()}>Add Gun - Delay</button>
   </div>
  )
 }
}

export default App;
