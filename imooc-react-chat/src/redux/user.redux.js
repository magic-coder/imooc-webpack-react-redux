import axios from 'axios';
import { getRedirectUrl } from '../util';
import cookies from 'browser-cookies';

// define action
const AUTH_SUCCESS = 'auth_success';
const LOAD_INFO = 'load_info';
const LOGOUT = 'logout';
const FAIL = 'fail';

// create action
function authAction(state) {
	const { pwd, ...data } = state;
	return {
		type: AUTH_SUCCESS,
		payload: data
	}
}

function loadInfoAction(state) {
	return {
		type: LOAD_INFO,
		payload: state
	}
}

function errorAction(state) {
	return {
		type: FAIL,
		payload: state
	}
}

function logoutAction() {
	return {
		type: LOGOUT
	}
}

// action entity with business logic
export function doRegisterAction(state) {
	return dispatch => {
		const { user, pwd, type } = state;
		if (!user || !pwd || !type) {
			return dispatch(errorAction({errorMsg: "Please fill in username or pwd."}));
		}
		axios.post('/user/register', {
			user: user,
			pwd: pwd,
			type: type,
		})
		.then(function (resp) {
			if (resp.status === 200 && resp.data.code === true) {
				dispatch(authAction(resp.data));
			} else {
				dispatch(errorAction(resp.data));
			}
		})
		.catch(function (err) {
			console.log(err);
		});
	}
}

export function doLoginAction(state) {
	return dispatch => {
		const { user, pwd } = state;
		if (!user || !pwd) {
			return dispatch(errorAction({errorMsg: "Please fill in username or pwd."}));
		}
		axios.post('/user/login', {
			user: state.user,
			pwd: state.pwd,
		})
		.then(function (resp) {
			if (resp.status === 200 && resp.data.code === true) {
				dispatch(authAction(resp.data))
			} else {
				dispatch(errorAction(resp.data));
			}
		})
		.catch(function (err) {
			console.log(err);
		});
	}
}

export function isUserLogin(resolve, reject) {
	return dispatch => {
		axios.get('/user/info', null)
			.then((resp) => {
				if (resp.status === 200 && resp.data.code === true) {
					dispatch(loadInfoAction(resp.data))
				} else {
					dispatch(errorAction(resp.data));
				}
				resolve("success");
			})
			.catch(err => {
				reject("fail");
			});
	}
}

export function doUpdateAction(state) {
	const { title, avatar, desc, company, money } = state;
	return dispatch => {
		axios.post('/user/update', {
			title,
			avatar,
			desc,
			company,
			money
		}).then((resp) => {
			if (resp.status === 200 && resp.data.code === true) {
				dispatch(authAction(resp.data));
			} else {
				dispatch(errorAction(resp.data));
			}
		}).catch(err => {
			console.log(err);
		})
	}
}

export function doLogout(resolve) {
	return dispatch => {
		dispatch(logoutAction());
		resolve(true);
	}
}

// reducer
const initState = {
	user: '',
	type: '',
	isAuth:false,
	redirectTo:'',
};
function user(state=initState, action) {
	const {type, payload} = action;
	switch (type) {
		case AUTH_SUCCESS:
			return { ...state, ...payload.user, redirectTo: getRedirectUrl(payload.user), isAuth: true };
		case LOAD_INFO:
			return { ...state, ...payload.user, redirectTo: getRedirectUrl(payload.user), isAuth: true };
		case FAIL:
			return { ...state, ...payload, isAuth: false };
		case LOGOUT:
			return {...initState};
		default:
			return state
	}
}

export default user;
