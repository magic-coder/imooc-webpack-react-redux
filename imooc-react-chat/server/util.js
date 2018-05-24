const utils = require('utility');

function md5Pwd(pwd){
	const salt = 'al_al_al';
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = {
	md5Pwd
};