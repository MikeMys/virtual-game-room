const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
const authRoute = require('./routes/auth'); 
const path = require('path'); 
const postRoute = require('./routes/post'); //to test JWT Tokens

//for safe use of database of uri
dotenv.config(); 

app.get("/", function(req, res) { //to load HTML file on the local host
    res.sendFile(__dirname + "/mainPage.html"); 
}); 

app.get("/register", function(req, res) { //to load HTML file on the local host
    res.sendFile(__dirname + "/register.html"); 
}); 

app.get("/login", function(req, res) { //to load HTML file on the local host
    res.sendFile(__dirname + "/login.html"); 
}); 

app.get("/update-password", function(req, res) { //to load HTML file on the local host
    res.sendFile(__dirname + "/updatePassword.html"); 
}); 

app.get("/reset-password", function(req, res) { //to load HTML file on the local host
    res.sendFile(__dirname + "/resetPassword.html"); 
}); 

//connect to DB 
const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, () => { 
    console.log("Connected to MongoDB"); 
})

//middleware 
app.use(express.json()); 

//routes middleware 
app.use('/api/user', authRoute); //prefix 
app.use('/api/posts', postRoute); 

app.listen(3000, () => { 
    console.log("Server is running"); 
}); 