
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var VideoSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	filePath : {
		type: String,
		default: '/public/video'
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	type: {
		type: String,
		enum: ['BoyGirl', 'GirlGirl', 'Solo']
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'Model'
	},
	creatorName: {
		type: String,
		default: ''
	},
	uploader: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Video', VideoSchema);