'use strict';

var users = require('../../app/controllers/users.server.controller'),
	videos = require('../../app/controllers/videos.server.controller'),
	index = require('../../app/controllers/index.server.controller');

module.exports = function(app) {
	app.route('/videos')
		.get(index.render);

	app.route('/api/videos')
		.get(videos.list)
		// middleware requiresLogin to make sure
		// user is logged in
		.post(videos.create);

	app.route('/api/videos/:videoId')
		.get(videos.read)
		// middlewares requiresLogin & hasAuthorization
		// to make sure user's logged in and only
		// updates/delets what they posted
		.put(users.requiresLogin, videos.hasAuthorization, videos.update)
		.delete(users.requiresLogin, videos.hasAuthorization, videos.delete);

	app.param('videoId', videos.videoByID);
};