var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name: "Clown's Folly",
        image: "https://images.unsplash.com/uploads/1413142095961484763cf/d141726c?auto=format&fit=crop&w=1350&q=80",
        description: "Thousands of clowns threw themselves off of the famous cliffs in an effort to make the mad king laugh. He did not."
    },
    {
        name: "Mini Forest",
        image: "https://images.unsplash.com/photo-1496060169243-453fde45943b?auto=format&fit=crop&w=672&q=80)",
        description: "This is a campground especially for those who are vertically challenged."
    },
    {
        name: "Belching Gulch",
        image: "https://images.unsplash.com/photo-1493585552824-131927c85da2?auto=format&fit=crop&w=1350&q=80",
        description: "While beautifully, most cannot stand the smell that arises ever hour from the hot springs. You've been warned."
    }
    
];
    
function seedDB() {
//Remove all campgrounds
Campground.remove({}, function(err) {
    if(err) {
        console.log(err);
    }
    //     //Add a few campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err, campground){
    //             if(err) {
    //                 console.log(err);
    //             } else {
    //                 //Create comment
    //                 Comment.create({
    //                     text: "I TOOK SHROOMS THERE AND TRIPPED FOR 3 DAYS STRAIGHT! 4/5 stars",
    //                     author: "Bridgette Lydia"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     }
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                 });
    //             }
    //         });
    //     });
    });
}

module.exports = seedDB;