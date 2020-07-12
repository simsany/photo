var express = require("express");
var router = new express.Router();
var mongoose = require("mongoose"),
	passport = require("passport"),
	middleware = require("../middleware"),



	User = require("../models/user")


router.get("/register", (req, res) => {
	res.render("register.ejs", { currentUser: req.user })
});



router.get("/", (req, res) => res.render("landing.ejs", { currentUser: req.user })

);



router.post("/register", (req, res) => {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash("error", err.message);
			res.redirect("register");
		} else {

			passport.authenticate("local")(req, res, function () {
				req.flash("success", "Successfully registered as: " + req.body.username);
				res.redirect("/");
			});
		}
	});
});



router.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		req.flash("success", "You are already logged in!");
		res.redirect("/photo")
	} else {
		res.render("login.ejs", { currentUser: req.user });
	}


});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/loggedin",
	failureRedirect: "/failedlogin"
}), (req, res) => {

	


});

router.get("/loggedin", middleware.isLoggedIn, (req, res) => {

				req.flash("success", "You just logged in!");
				res.redirect("/photo");
	
	});
	router.get("/failedlogin",(req, res) => {
if(!req.isAuthenticated()){
				req.flash("error", "Failed to log in!");
res.redirect("/login");}else{
	res.redirect("/photo")
	
}
	
	});
	
router.get("/logout", function (req, res) {
	
	req.flash("success", "You logged out")
	req.logout()
	res.redirect("/");


});


module.exports = router;
