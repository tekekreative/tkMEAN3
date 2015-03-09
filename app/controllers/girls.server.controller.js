'use strict';
// Used Mongoose module to call model method
var Model = require('mongoose').model('Model');

// Created controller called 'create()' which 
// is used to create new models.  the 'New' keyword
// creates a new instance, which is populated
// using request body.  Call save method that 
// either saves the model and outputs the user object
// or fails, passing error to next middleware
exports.create = function(req, res, next) {
	var model = new Model(req.body);

	model.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(model);
		}
	});
};

exports.list = function(req, res, next) {
	// Find method accepts up to four params
	// Query:  mongoDB query object
	// [Fields]: Optional string object that represents the doc fields to return
	// [Options] Optional options
	// [Callback]: Optional callback f'n
	Model.find({}, function(err, girls) {
		if (err) {
			return next(err);
		} else {
			res.json(girls);
		}
	});
};

exports.read = function(req, res) {
	// Find a single model using modelByID middleware
	res.json(req.model);
};

exports.modelByID = function(req, res, next, id) {
	Model.findOne({
		_id: id
	}, function(err, model) {
		if (err) {
			return next(err);
		} else {
			req.model = model;
			next();
		}
	});	
};
//use model's id field to find and update correct doc
exports.update = function(req, res, next) {

	Model.findByIdAndUpdate(req.model.id, req.body, function(err, model) {
		if (err) {
			return next(err);
		} else {
			res.json(model);
		}
	});
};

//use modelById to find and delete correct doc
exports.delete = function(req, res, next) {
	req.model.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.model);
		}
	});
};
