'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GirlsSchema = new Schema({
	name: {
		type: String,
		index: true
	},
	userName: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},

	photos: Number,
	videos: Number,
	twitter: String,
	profile: {
		type: String,
		// Custom getter modifiers
		get: function(url) {
			if (!url) {
				return url;
			} else {
				if ((url.indexOf('http://') !== 0) && (url.indexOf('https://') !== 0)) {
					url = 'http://' + url;
				}
				return url;
			}
		}
		// Custom setter modifiers
		/*set: function(url) {
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0) && (url.indexOf('https://') !== 0) {
					url = 'http://' + url;
				}
				return url;
			}
		}*/
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// Dynamically calculate doc properties which are not
// really presented in the documents, called 'virtual 
// attributes' (Chpt 5: Adding VirtAttr)
GirlsSchema.virtual('total').get(function() {
	return this.photos + this.videos;
});

// GirlsSchema.virtual('initial').get(function() {
// 	var fullName = this.name;
// 	var splitName = fullName.split(' ');
// 	this.firstInit = splitName[0].charAt(0) || '';
// 	this.secondInit = splitName[1].charAt(0) || '';
// 	this.initial = this.firstInit + this.secondInit;
// 	return this.initial;
// });

// Configured your schema using GirlsSchema.set()
// Forces Mongoose to include getters when converting 
// the MongoDB doc to a JSON representation and will
// allow the output of documents using res.json() to
// include the getter's behavior, 
GirlsSchema.set('toJSON', { 
	getters: true, 
	virtuals: true
});

GirlsSchema.statics.findOneByUsername = function (username, callback) {
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

GirlsSchema.methods.authenticate = function(password) {
	return this.password === password;
};


mongoose.model('Model', GirlsSchema);