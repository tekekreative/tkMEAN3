process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load mongoose config file before any other
// configuration so that the other modules
// will be able to use the Model
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);

module.exports = app;

console.log('Server running at localhost:3000');

// Connected all the loose ends by requiring the Express config module
// and then using it to retrieve your application object instance
// and listen to 3000 port.  

//Initialized Mongoose configuration with
//var mongoose and db

