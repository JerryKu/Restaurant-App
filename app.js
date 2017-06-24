var express = require("express");
var app = express();
var bodyParser = require("body-parser")

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
    res.render("restaurants",{restaurants:restaurants});
});

app.post("/restaurants", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newRestaurant = {name: name, image: image};
    restaurants.push(newRestaurant);
    res.redirect("/restaurants");
});

app.get("/restaurants/new", function(req,res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started.");
});