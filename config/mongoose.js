'use strict';
var config = require('./config'),
	mongoose = require('mongoose');

module.exports= function() {
	var db = mongoose.connect(config.db);

	// Include the js file in order to
	// register the model
	require('../app/models/girl.server.models');
	require('../app/models/user.server.models');
	require('../app/models/video.server.models');
	return db;
};