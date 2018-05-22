import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import App from './App';
import { logout, addGunDelay } from '../redux/auth.redux';

function ErYing(props) {
 return (
   <div>
     erying
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

class Test extends React.Component {
 render() {
   return (
     <div>test {this.props.match.params.location}</div>
   );
 }
}

@connect(
  (state) => (state.auth),
  { logout }
)
class Dashboard extends React.Component {
 render() {
  const match = this.props.match;
  const isAuth = this.props.isLogin;
  return (
   <div>
    {
      isAuth ? 
      <button onClick={() => this.props.logout()}>Logout</button> : 
      <Redirect to='/login' />
    }
    <ul>
      <li>
        <Link to={`${match.url}/yiying`}>YiYing</Link>
      </li>
      <li>
        <Link to={`${match.url}/erying`}>ErYing</Link>
      </li>
      <li>
        <Link to={`${match.url}/qibinglian`}>QiBingLian</Link>
      </li>
      <li>
        <Link to={`${match.url}/123`}>Test</Link>
      </li>
    </ul>
    <Switch>
     <Route path={`${match.url}/yiying`} exact component={App} />
     <Route path={`${match.url}/erying`} exact component={ErYing} />
     <Route path={`${match.url}/qibinglian`} exact component={QiBingLian} />
     <Route path={`${match.url}/:location`} component={Test} />
    </Switch>
   </div>
  )
 }
}

export default Dashboard;
