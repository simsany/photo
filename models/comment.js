var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
	text: String,
	author: {id:String,
username: String,},
	date: {
		type: Date,
		default: Date.now
	}


});
module.exports = mongoose.model("Comment", commentSchema);
