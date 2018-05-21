// define action
const ADD_GUN = 'add_gun';
const REDUCE_GUN = 'reduce_gun';

// action creator
export function addGunAction() {
	return {
		type: ADD_GUN
	};
}

export function reduceGunAction() {
	return {
		type: REDUCE_GUN
	};
}

// gun reducer
export const gunReducer = (state = {counter: 0}, action) => {
	switch (action.type) {
		case ADD_GUN:
			return ++state;
		case REDUCE_GUN:
			return --state;
		default:
			return 10;
	}
};

export function addGun() {
	return (dispatch, getState) => {
		dispatch(addGunAction());
	}
}

export function reduceGun() {
	return (dispatch, getState) => {
		dispatch(reduceGunAction());
	}
}

export function addGunDelay() {
	return (dispatch, getState) => {
		const num = getState().counter;
		if (num < 10) {
			setTimeout(() => {
				dispatch(addGunAction());
			}, 2000);
		}
	}
}
