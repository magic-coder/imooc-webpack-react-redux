import axios from 'axios';

// define action
const LOGIN = 'login';
const LOGOUT = 'logout';
const GET_USER_DATA = 'get_userdata';

const initState = {isLogin: false, username: 'Li'};

// action creator
export function loginAction() {
	return {
		type: LOGIN
	}
}

export function logoutAction() {
	return {
		type: LOGOUT
	}
}

export function getUserDataAction(data) {
	return {
		type: GET_USER_DATA,
		payload: data
	}
}

// action reducer
export function userReducer(state = initState, action) {
	switch (action.type) {
		case LOGIN:
			return {...state, isLogin: true};
		case LOGOUT:
			return {...state, isLogin: false};
		case GET_USER_DATA:
			return {...state, username: action.payload.username };
		default:
			return state;
	}
}

// real action
export function login() {
	return dispatch => {
		dispatch(loginAction());
	}
}

export function logout() {
	return dispatch => {
		dispatch(logoutAction());
	}
}

export function getUserData() {
	return dispatch => {
		axios.get('/data')
			.then(res => {
				if (res.status === 200) {
					dispatch(getUserDataAction(res.data));
				}
			})
	}
}
