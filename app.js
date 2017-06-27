var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restaurants");

//SCHEMA Setup
var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Restaurant.create(
//     {
//         name: "McDonald's",
//         image: "http://is2.mzstatic.com/image/thumb/Purple127/v4/8a/4d/a0/8a4da0bc-2f59-9f66-4923-05fd8e4959e6/source/1200x630bb.jpg",
//         description: "This is just a McDonald's"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(campground)
//         }
//     });

var restaurants = [
    {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"}
    ]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.render("landing");
});

app.get("/restaurants", function(req,res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        } else{
            res.render("index", {restaurants:allRestaurants});
        }
    })
});

app.post("/restaurants", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newRestaurant = {name: name, image: image};
    Restaurant.create(newRestaurant, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/restaurants");
        }
    })
});

//NEW - show form to create new
app.get("/restaurants/new", function(req,res){
    res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/restaurants/:id", function(req,res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if(err){
            console.log(err);
        }else{
            res.render("show", {restaurant: foundRestaurant});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started.");
});