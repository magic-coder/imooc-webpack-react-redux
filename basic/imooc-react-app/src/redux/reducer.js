import { combineReducers } from 'redux';
import { userReducer } from '../redux/auth.redux';
import { gunReducer } from '../redux/dashboard.redux';

const auth = userReducer;
const counter = gunReducer;
export default combineReducers({auth, counter});
