"use strict";
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	gulp.src([
		'public/application.js',
		'public/**/*.js',
		'!public/lib/**/*.js',
	])
	.pipe(concat('tkMEAN.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/build'))
});

