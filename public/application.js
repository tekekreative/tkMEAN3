'use strict';
var mainApplicationModuleName = 'tekeME';

// create the main application module
// added the example module
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'example', 'girls', 'videos']);

mainApplicationModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
	}
]);

if (window.location.hash === '#_=_')
	window.location.hash ='#!';
// jqLite functionality to bind a function to the doc.ready evt
angular.element(document).ready(function() {
	// initiate a new AngJS app using the mainApp module
	angular.bootstrap(document, [mainApplicationModuleName]);
});