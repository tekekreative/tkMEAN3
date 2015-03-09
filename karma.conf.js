'use stricts';
module.exports = function(config) {
	config.set({
		//use the jasmine framework
		frameworks: ['jasmine'],
		// sets the list of files to include in test.
		// can use global patterns to indicate files
		files: [
			'public/lib/angular/angular.js',
			'public/lib/angular-resource/angular-resource.js',
			'public/lib/angular-route/angular-route.js',
			'public/lib/angular-mocks/angular-mocks.js',
			'public/application.js',
			'public/*[!lib]*/*.js',
			'public/*[!lib]*/*[!tests]*/*.js',
			'public/*[!lib]*//tests/unit/*.js'
		],
		// sets the way Karma reports its test results
		reporters: ['progress'],
		// list of browsers Karma will test on
		browsers: ['PhantomJS'],
		// sets timeout for karma test execution
		captureTimeout: 60000,
		// forces karma to quit after test execution
		singleRun: true
	});
};