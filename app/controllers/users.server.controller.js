'use strict';
// Used Mongoose module to call model method
var User = require('mongoose').model('User'),
	passport = require('passport');

// a private method that returns a unified error msg from a 
// Mongoose error object
// 2 possible errors: a MongoDB indexing error handled using
// the error code AND a Mongoose validation error handled using
// err.errors object
var getErrorMessage = function(err) {
	var message= '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default: 
				message = 'Something went wrong';
				break;
		} 
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}

	return message;
};

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

// no signin() method because Passport provides an
// authentication method()

// when an authentication process if failing, it's common
// to redirect the request back to the signup/signin pages
// Since variables can't be passed btwn pages, Connect-flash
// passes temporary msg btwn requests
exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body),
		message = null;

		user.provider = 'local';

		user.save(function(err) {
			// if error getErrorMessage provides error msg
			if (err) {
				message = getErrorMessage(err);

				// Connect-Flash module allows you to store
				// temp msgs in an area of the session obj
				// called flash.
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

// req.logout() method is provided by Passport to invalidate
// the authenticated session
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

// Use express middleware chaining to block
// unauthorized requests from executing controller
// methods so you don't implement same validation
// code over and over again

// middleware check whether user is authenticated
// currently.  If signed in, next middleware is called,
// otherwise calls an auth error and http error code
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};
