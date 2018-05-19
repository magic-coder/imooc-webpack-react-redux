import React from 'react';
import { connect } from 'react-redux';
import { addGun, reduceGun, addGunAsync } from './index.redux';

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

const mapStateToProps = (state) => {
 return {
  num: state
 }
}

const actionCreators = {
 addGun, reduceGun, addGunAsync
}

App = connect(mapStateToProps, actionCreators)(App);
export default App;
