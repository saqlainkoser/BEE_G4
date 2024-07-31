//Rest api in Express
//POST

const express=require('express');
const app= express()
const moviesRouter = require('./Routes/movieRoutes')
app.use(express.json())

//Mongoose - it is a library to access MONGODB via NODEJS
//Dotenv - it is a library to access config.env file for 
//         global variables.

//importing modules to connect mongodb
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:"./config.env"})


//TO CONNECT 
// console.log(process.env.CONN_STR);
mongoose.connect(process.env.CONN_STR)
.then((conn)=>{
    console.log("DB Connection Successfull");
}).catch((error)=>{
    console.log("some error has occured");
})



app.use("/api/v1/movies/",moviesRouter)

module.exports = app



