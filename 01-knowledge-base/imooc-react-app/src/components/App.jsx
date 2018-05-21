import React from 'react';
import { connect } from 'react-redux';
import { addGun, reduceGun, addGunDelay } from '../redux/dashboard.redux';

@connect(
 state => ({ counter : state.counter }), // state mapping to props 
 { addGun, reduceGun, addGunDelay } // auto-dispatch actions mapping to props
)
class App extends React.Component {
 render() {
  return (
   <div>
    <h1>How many guns? {this.props.counter}</h1>
    <button onClick={() => this.props.addGun()}>Apply Gun</button>
    <button onClick={() => this.props.reduceGun()}>Take Away Gun</button>
    <button onClick={() => this.props.addGunDelay()}>Add Gun - Delay</button>
   </div>
  )
 }
}

export default App;
