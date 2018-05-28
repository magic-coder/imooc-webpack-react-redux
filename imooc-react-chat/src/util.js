export function getRedirectUrl (user) {
	let url = (user.type === 'boss') ? '/boss' : '/genius';
	url = !user.avatar ? url += 'info' : url;
	return url;
}

export function getChatId (userId, targetId) {
	return [userId, targetId].sort().join('_');
}