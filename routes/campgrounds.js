var express = require("express");
var router = new express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")
router.get("/", (req, res) => {

	Campground.find({}, function (err, campgrounds) {
		if (err) { console.log("something went wrong"); }
		else {
			res.render("campgrounds/campgrounds.ejs", {
				campgrounds: campgrounds,
				currentUser: req.user
			});
		}
	});
});


router.post("/", middleware.isLoggedIn, (req, res) => {

	Campground.create(req.body.campground
		, function (err, campground) {
			if (err) { console.log(err) }
			else {
				campground.author.id = req.user.id;
				campground.author.username = req.user.username;
				campground.save();
				req.flash("success", "Successfully added!");
				res.redirect("/photo");
			}
		});




});

router.get("/new", middleware.isLoggedIn, (req, res) => res.render("campgrounds/new.ejs", { currentUser: req.user }));

router.get("/:id", (req, res) => {

	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if (err) { console.log(err) }
		else {

			res.render("campgrounds/show.ejs", { campground: foundCampground, currentUser: req.user });
		}


	});




});

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {

	Campground.findById(req.params.id, (err, foundCampground) => {

		res.render("campgrounds/edit.ejs", { campground: foundCampground, currentUser: req.user });

	}
	);
});

router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, foundCampground) => {
		if (err) { console.log("seggfej") } else {



			req.flash("success", "Successfully updated!");
			res.redirect("/photo/" + req.params.id)

		}
	});

});


router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {

	Campground.findByIdAndRemove(req.params.id, (err, foundCampground) => {
		if (err) { console.log("error") } else {
			req.flash("success", "Successfully removed");
			res.redirect("/photo");
		}
	}
	);

});


module.exports = router;