var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');

	//serializeUser & deserializeUser are used to define
	// how Passport will handle user serialization

	// When authenticated, passport will save its _id property
	// to the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// When user object's needed, Passport will use the _id
	// property
	
	// '-password -salt' is used in the field options argument
	// to make sur Mongoose doesn't fetch the user's password
	// and salt properties
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	require('./strategies/local.js')();
};