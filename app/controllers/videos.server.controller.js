'use strict';
var mongoose = require('mongoose'),
	Video = mongoose.model('Video'),
	Model = mongoose.model('Model');

// error handling function for Mongoose errors
// returns the first msg from the Mongoose error object
// (err) passed
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			}
		}
	} else {
		return 'Unknown server error';
	}
};

exports.create = function(req, res) {
	var video = new Video(req.body);
	//added the authenticated pssport user as the video uploader
	video.uploader = req.user;

	// used the save() method to save the article document
	video.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			Model.findOne({name: video.creatorName}, {$inc: {"videos": 1}});
			res.json(video);
		}
	});

};			

exports.list = function(req, res, next) {
	// Find method accepts up to four params
	// Query:  mongoDB query object
	// [Fields]: Optional string object that represents the doc fields to return
	// [Options] Optional options
	// [Callback]: Optional callback f'n
	Video.find().sort('-created').populate(
			'creator', 'firstName lastName fullName'
		).exec(function(err, videos) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});		
		} else {
			res.json(videos);
		}
	});
};

// contains all express middleware arguments + id
// uses 'id' to find video and ref it using req.video property
exports.videoByID = function(req, res, next, id) {
	Video.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, video) {
			if (err) return next(err);
			if (!video) return next(new Error('Failed to load article ' + id));

			req.video = video;
			next();
	});
};

exports.read = function(req, res) {
	// took care of obtaining the video object via videoByID
	res.json(req.video);
};

exports.update = function(req, res) {
	var video = req.video;

	video.title = req.body.title;
	video.type = req.body.type;

	video.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

exports.delete = function(req, res) {
	var video = req.video;

	video.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	// using uploader.id and user.id to verify that the user is 
	// creator of current article
	if (req.video.uploader.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};