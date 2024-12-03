const express = require('express');
const app = express();
const date = require(__dirname + "/date.js");


const items = [];
const workItems = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    
    let day = date.getDate();
    
   res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){
    
    var item = req.body.newItem;
    if(req.body.list == "work"){
        workItems.push(item);
        res.redirect("/work");

    }
    else{
        items.push(item);
        res.redirect("/");
    };
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "work list", newListItems: workItems})
});

app.get("/about", function(req,res){
    res.render("about");
});

app.listen (3000, function(){
    console.log("Server is running on port 3000");

});