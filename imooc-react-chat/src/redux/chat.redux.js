import axios from 'axios';

// define action
const DISPLAY_CHATTING_LIST = 'display_chatting_list';

// create action
function displayChattingListAction(state) {
	return {
		type: DISPLAY_CHATTING_LIST,
		payload: state
	}
}

// do action
export function doDisplayChattingListAction(type) {
	return display => {
		axios.get(`/user/list?type=${type}`)
			.then((resp) => {
				display(displayChattingListAction({ chattingList: resp.data }));
			})
			.catch(err => {
				console.log(err);
			});
	}
}

// dispatch action
const initState = {
	chattingList: []
};
function chat(state=initState, action) {
	const { type, payload } = action;
	switch (type) {
		case DISPLAY_CHATTING_LIST:
			return {...state, ...payload};
		default:
			return state;
	}
}

export default chat;
