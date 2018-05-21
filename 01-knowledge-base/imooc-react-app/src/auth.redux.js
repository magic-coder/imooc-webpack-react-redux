const LOGIN = 'login';
const LOGOUT = 'logout';

export function login() {
 return {
  type: LOGIN
 }
}

export function logout() {
 return {
  type: LOGOUT
 }
}

export function userReducer(state = {isLogin: false, username: 'Li'} , action){
 switch (action.type) {
  case LOGIN:
   return {...state, isLogin: true};
  case LOGOUT:
   return {...state, isLogin: false};
  default:
   return state; 
 }
}
