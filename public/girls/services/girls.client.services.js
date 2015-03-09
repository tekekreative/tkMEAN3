'use strict';

angular.module('girls').factory('Girls', ['$resource', function($resource) {
	// base url for video end points
	// routing param assignment using video's document id
	// extending actions with update() for PUT methods
	return $resource('/api/girls/:modelId', {
		modelId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);