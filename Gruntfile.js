'use strict';

// config file uses a single module f'n to inject
// grunt object
module.exports = function(grunt) {
	// configure your third party tasks
	grunt.initConfig({
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			prod: {
				NODE_ENV: 'production'
			}
		},
		// created a dev env config
		nodemon: {
			dev: {
				// describe main script file
				script: 'server.js',
				// watch both html and js files in
				// the config and app folders
				options: {
					ext: 'js,html',
					watch: ['server.js', 'config/**/*.js',
					'app/**/*.js']
				}
			}
		},
		jshint: {
			options: {
				node: true,
				globals: {
					angular: true,
					window: true,
					document: true
				}
			},
			all: {
				src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/**/*.js', '!public/lib/**/*.js'
				]
			}
		},
		csslint: {
			all: {
				src: 'public/css/*.css'
			}
		}
	});

	// load the grunt-env module
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// created default grunt task
	// first argument's the task name
	// second is collection of other tasks that's
	// executed when parent task is used
	grunt.registerTask('default', ['env:dev', 'nodemon']);
	grunt.registerTask('lint', ['jshint' ]);
	grunt.registerTask('prod', ['env:prod' ]);

};