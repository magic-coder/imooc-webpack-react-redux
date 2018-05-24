export function getRedirectUrl (user) {
	let url = (user.type === 'boss') ? '/boss' : '/genius';
	url = !user.avatar ? url += 'info' : url;
	return url;
}