var mongoose = require("mongoose");
var campgroundSchema = mongoose.Schema({
	name: String,
	date: {
		type: Date,
		default: Date.now
	},
	price: String,
	source: String,
	description: String,

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"

	}],

	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
		, username: String,
	}

});
module.exports = mongoose.model("Campground", campgroundSchema);
