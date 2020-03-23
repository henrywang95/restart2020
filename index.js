const express = require('express');
const http = require('http');
const port = process.env.PORT || 3030;

// const mongoose = require('mongoose');

// Using nedb for now 
const path = require('path');
const Datastore = require('nedb');
const pathToData = path.resolve(__dirname, "db/db");
const db = new Datastore({ filename: pathToData});
db.loadDatabase();

//start express
const app = express();

// Send files from the public directory
app.use(express.static( path.resolve(__dirname, 'public') ));

// Handling JSON data 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies


app.get("/", (request, response) => {
    response.sendFile("index.html");
});

// Show all my submissions
app.get("/2", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/yes.html'))
})

app.get("/3", function (req, res) {
    res.sendFile(path.join(__dirname + '/public/no.html'))
  })

// app.get("/4", function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/submission.html'))
// })

app.get("/post", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/submission.html'))
})

app.get("/api", (req, res) => {    
    db.find({}, function (err, docs) {
        if(err){
            return err;
        } 
        res.json(docs);
    });
});

app.post("/post", (req, res) => {
    const unixTimeCreated = new Date().getTime();
    let newpost = req.body.newhope;

    // add our unix time as a "created" property and add it to our request.body
    const newData = Object.assign({"created": unixTimeCreated}, req.body)
    // add in our data object to our database using .insert()
    db.insert(newData, (err, docs) =>{
        if(err){
            return err;
        }
        res.json(docs);
    });
})
  

http.createServer(app).listen(port, () =>{
        console.log(`see the magic at: http://localhost:${port}`)
})

