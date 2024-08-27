const express = require('express')
// import express from "express"
const app = express();
const port = process.env.PORT || 3000 ;
const web = require('./routes/web.js')
// import web from './routes/web.js'

//Set Template Engine
app.set('view engine','ejs')

//Load Routes
app.use('/',web)

app.listen(port , ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})