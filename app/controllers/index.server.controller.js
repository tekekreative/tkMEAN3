exports.render = function(req, res) {

	// record the time of the last user request
	// controller checks whether lastVisit property
	// was set in the session object and if so,
	// outputs the last visit date.
	console.log(req);
	console.log(req.session);	
	if (req.session.lastVisit) {
		console.log("Last session was at" + req.session.lastVisit);
	}

	// sets the property to the current time
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Hello World',
		user: JSON.stringify(req.user)
	});
};

// You're using the commonJS module pattern to define a function named 
// render().  You'll need to use Express routing functionality
// to utilize the controller

// res.render() : first argument is the name of the EJS template
// without the extension and the second argument is an object 
// containing template variables
// The method will look for the file in the views folder that we 
// set in the config/express.js file and render the view