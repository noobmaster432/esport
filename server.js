require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const path = require("path");

app.use(express.json())

app.set('view engine', 'ejs');

// app.use(express.static("public"));
// app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.DATABASE_URL)

const contactRouter = require('./routes/contacts')
app.listen(port, ()=> console.log('listening on port '+port)) 
app.use('/', contactRouter)