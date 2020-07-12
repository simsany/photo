var express = require("express");
var router = new express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware")

router.get("/new", middleware.isLoggedIn, (req, res) => {




	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) { console.log(err) }
		else {
			console.log(req.params);
			res.render("comments/new.ejs", { campground: foundCampground, currentUser: req.user });
		}


	});
});








router.post("/", middleware.isLoggedIn, (req, res) => {

	Comment.create(req.body.comment, function (err, comment) {
		if (err) { console.log(err) }
		else {


			Campground.findById(req.params.id, function (err, foundCampground) {
				if (err) { console.log("something went wrong"); }
				else {
					foundCampground.comments.push(comment);
					foundCampground.save();
					req.flash("success", "Successfully added!");
					res.redirect("/photo/" + req.params.id);
				}
			});
		};



	});
});

router.get("/:comments_id/edit", middleware.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comments_id, (err, foundComment) => {
		if (err) { console.log("ss") } else {
			Campground.findById(req.params.id, (err, foundCampground) => { if (err) { console.log("ee") } else { res.render("comments/edit.ejs", { comment: foundComment, currentUser: req.user, campground: foundCampground }); } })


		}

	})


});
router.put("/:comments_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, (err, foundComment) => {
		if (err) { console.log("seggfej") } else {


			req.flash("success", "Successfully updated");
			res.redirect("/photo/" + req.params.id)

		}
	});

});
router.delete("/:comments_id", middleware.checkCommentOwnership, (req, res) => {

	Comment.findByIdAndRemove(req.params.comments_id, (err, foundComment) => {
		if (err) { console.log(req.params.comments_id) } else {
			req.flash("success", "Successfully deleted");
			res.redirect("/photo/" + req.params.id);
		}
	}
	);

});











module.exports = router;