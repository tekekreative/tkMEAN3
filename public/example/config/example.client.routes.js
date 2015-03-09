'use strict';

angular.module('example').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'example/views/example.client.view.html'
		}).otherwise({
			redirectTo: '/'
		});

		// $routeProvider.
		// 	when('/signin', {
		// 		redirectTo: '/signin'
		// 	}).otherwise({
		// 		redirectTo: '/'
		// 	});

		// $routeProvider.
		// 	when('/signup', {
		// 		redirectTo: '/signup'
		// 	}).otherwise({
		// 		redirectTo: '/'
		// 	});
	}
]);