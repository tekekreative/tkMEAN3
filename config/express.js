'use strict';

// Create the Express app object and bootstrap it using the 
// controller and routing modules we just created

var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport'),
	redisStore = require('connect-redis')(session);

module.exports = function() {
	var app = express();
	var sessionStore = new redisStore();
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		// where you define the secret property
		// can get or set any property that you 
		// wich to use in the current session
		secret: config.sessionSecret,
		store: sessionStore
	}));
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/girls.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/videos.server.routes.js')(app);

	// Serve static files
	// static call placed below
	// if not, Express would first try to 
	// look for http request paths
	// in the statics file folder
	app.use(express.static('./public'));

	return app;
};

// You required the Express module then used the CommonJS module 
// pattern to define a module function that intializes the Express app.
// It creates a new instance of an Express app, then requires
// the routing file and calls it as a f'n passing it the app
// instance as an argument
// Module f'n ends by returning the app instance
// used process.env.NODE_ENV variable to determine environment
// and configure the app accordingly using app.use()

//Used app.set() to configure the Express application views folder
// and template engine