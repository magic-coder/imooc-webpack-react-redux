import axios from 'axios';
import { getRedirectUrl } from '../util';

// define action
const AUTH_SUCCESS = 'auth_success';
const LOAD_INFO = 'load_info';
const FAIL = 'fail';

// create action
function authAction(data) {
	return {
		type: AUTH_SUCCESS,
		payload: data
	}
}

function loadInfoAction(data) {
	return {
		type: LOAD_INFO,
		payload: data
	}
}

function errorAction(data) {
	return {
		type: FAIL,
		payload: data
	}
}

// action entity
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
				resolve();
			})
			.catch(err => {
				console.log(err);
				reject();
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
		default:
			return initState
	}
}

export default user;