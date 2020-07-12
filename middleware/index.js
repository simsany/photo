var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middleware={};
middleware.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		
	Campground.findById(req.params.id,(err,foundCampground)=>{
	
	if(err){res.redirect("back");}else{
		if(foundCampground.author.id.equals(req.user.id)){
	next();	
	}else{res.redirect("back");}}
	}
	);	
	}
	else{req.flash("error","Please log in first");} 
	
}
middleware.checkCommentOwnership=function (req,res,next){
	if(req.isAuthenticated()){
		
	Comment.findById(req.params.comments_id,(err,foundComment)=>{
	
	if(err){res.redirect("back");}else{
		if(foundComment.author.id===req.user.id){
			
	next();	
	}else{req.flash("error","You don't have permission");}}
	}
	);	
	}
	else{req.flash("error","Please log in first");;} 
	
}
middleware.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){return next();}
	else{
		
		req.flash("error","Please log in first");
		res.redirect("/login")}
	
	
}



 








module.exports=middleware;