// requirements
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	// register the strategy
	passport.use(new LocalStrategy(
		function(username, password, done){
			User.findOne({
				username: username
			}, function(err, user) {
				// if there's an error the err object will be 
				// passed to the done callback
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, {
						message: 'Unknown user'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}
				// if authenticated, user obj will be passed to the
				// done callback 
				return done(null, user);
			});
	}));
};