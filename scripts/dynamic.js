module.exports = function registerDynamicPages(website) {
	website.get('/reinicio-administrativo', require('./reinicio-administrativo'));
};
