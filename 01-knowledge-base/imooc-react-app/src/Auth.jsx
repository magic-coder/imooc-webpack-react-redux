import React from 'react';
import { connect } from 'react-redux';
import { login } from './auth.redux';
import { Redirect } from 'react-router-dom';

@connect(
 state => ({ auth : state.auth }),
 { login }
)
class Auth extends React.Component {
 render() {
  return (
   <div>
    <h1>My name is {this.props.auth.username}</h1>
    {
     this.props.auth.isLogin ? 
     <Redirect to='/dashboard' /> : null
    }
    <h3>You don't have priviledge. Plese login.</h3>
    <button onClick={() => this.props.login()}>login</button>
   </div>
  )
 }
}

export default Auth;
