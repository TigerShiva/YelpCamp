var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");

//COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //Find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
   //Lookup CAMPGROUND via ID
   Campground.findById(req.params.id, function(err, campground){
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   req.flash("error", "Looks like something went wrong...try again in a few minutes");
                   console.log(err);
               } else {
                   //Add USERNAME and ID to COMMENT
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Your comment has been added!");
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
   });
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
    res.render("comments/edit", req.params.id);
});

//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//DESTROY COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            req.flash("error", "Looks like something went wrong...try again in a few minutes");
            res.redirect("back");
        } else {
            req.flash("success", "Your comment has been deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;