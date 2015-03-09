'use strict';

angular.module('girls')
	.controller('GirlsController', ['$scope', '$routeParams', '$location', 'Girls', function($scope, $routeParams, Girls) {

		$scope.loadOptions = function() {
			$scope.girls = Girls.query();	
		};
	}
]);