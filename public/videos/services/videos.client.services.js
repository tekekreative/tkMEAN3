'use strict';

angular.module('videos').factory('Videos', ['$resource', function($resource) {
	// base url for video end points
	// routing param assignment using video's document id
	// extending actions with update() for PUT methods
	return $resource('/api/videos/:videoId', {
		videoId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);