'use strict';
var girls = require('../../app/controllers/girls.server.controller');

module.exports = function(app) {
	app.route('/api/girls')
		.post(girls.create)
		.get(girls.list);

	// Find a single model profile using their Id
	// modelByID middleware gets executed before girls.read
	app.route('/api/girls/:modelId')
		.get(girls.read)
		// Update a document
		.put(girls.update)
		// Delete a document
		.delete(girls.delete);

	// middleware to look up model by Id from the url
	// parameter provided by user
	app.param('modelId', girls.modelByID);
};