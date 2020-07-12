var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
User = require("./models/user");
app.use(express.static(__dirname + '/public'));
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var flash = require("connect-flash");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(require("express-session")({
	secret: "Petra is the best indeed",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb+srv://sanyika:3956121@cluster0.hg5xp.mongodb.net/orders?retryWrites=true&w=majority")
methodOverride = require("method-override");
app.use(methodOverride("_method"));






app.use((req, res, next) => {
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();

})

app.use(indexRoutes);

app.use("/photo/:id/comments", commentRoutes);

app.use("/photo", campgroundRoutes);

















	app.listen(process.env.PORT);



