"use strict";
const express = require('express');
const app = express();
const path = require('path');


//MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'));

app.get('*' , function (req,res) {
   res.sendfile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, function () {
    console.log("Web server on port 3000")
});