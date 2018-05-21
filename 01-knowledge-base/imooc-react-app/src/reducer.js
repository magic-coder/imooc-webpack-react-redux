import { combineReducers } from 'redux';
import { userReducer } from './auth.redux';
import { gunReducer } from './dashboard.redux';

const auth = userReducer;
const counter = gunReducer;
export default combineReducers({auth, counter});
