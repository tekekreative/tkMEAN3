'use strict';
// Using the CommonJS module pattern for single module functions
module.exports = function(app) {
	// Require the index controller and use its render method
	// as a middleware to GET requests made to the root path
	var index= require('../controllers/index.server.controller');
	app.get('/', index.render);
};