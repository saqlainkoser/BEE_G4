const mongoose=require('mongoose');

//TO make schema
const movieSchema=new mongoose.Schema({
    //fields declaration
    name:{
        type:String,
        unique:true
    },
    description:String,
    duration:Number,
    ratings:Number
})

//To make model
const Movie=mongoose.model("Movie",movieSchema)

// //To create new Document
// const testMovie=new Movie({
//     name:"Rocky",
//     description:"Action packed movie",
//     duration:139,
//     ratings:4.5
// })

// //TO insert this document
// testMovie.save()
// .then(()=>{
//     console.log("Data added");
// }).catch((err)=>{
//     console.log("Error Occured" +err);
// })

module.exports = Movie;