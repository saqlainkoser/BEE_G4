const mongoose=require('mongoose');
const fs = require('fs');




//TO make schema
const movieSchema=new mongoose.Schema({
    //fields declaration
    name:{
        type:String,
        required:[true,"Name is Required field!"],
        unique:true,
        minlength:[4],
        maxlength:[100],
        trim:true
    },
    description:{
        type:String,
        required:[true,"description is Required field!"]
    },
    duration:{
        type:Number,
        required:[true,"duration is Required field!"]
    },
    ratings:Number,
    totalRatings:Number,
    releaseYear:{
        type:Number,
        required:[true,"releaseYear is Required field!"]
    },
    releaseDate:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    genres:{
        type: [String],
        required:[true,"Genres is Required field!"]
    },
    directors:{
        type: [String],
        required:[true,"Directors is Required field!"]
    },
    actors:{
        type: [String],
        required:[true,"Actors is Required field!"]
    },
    coverImage:{
        type: [String],
        required:[true,"CoverImage is Required field!"]
    },
    price:{
        type: Number,
        required:[true,"Price is Required field!"]
    },

    createdBy:String
   
},
{
   toJSON :{virtuals:true},
   toObject:{virtuals :true}
}
)
//Virtual Field - 

movieSchema.virtual("durationInHour").get(function (){
    return this.duration / 60;
})

movieSchema.virtual("main_lead").get(function(){
    return this.actors[0];
})


//Mongoose Middleware

movieSchema.pre("save",function(next){
    this.createdBy = "Shaan"
    next();
})

//TO log any update

movieSchema.post("save",function(doc,next){
    const content = `A new movie with name ${doc.name} is created by ${doc.createdBy}/n`
    fs.writeFileSync("./Log/log.txt",content,{flag :'a'},(err)=>{
        console.log(err.message);
    })
    next();
})

//Query middleware to get correct data
movieSchema.pre(/^find/,function(next){
    this.find({releaseDate : {$lte:Date.now()}})
    // console.log(Date.now());
    this.starttime = Date.now()
    next();
})

//Query middleware post for fetch time calculation
movieSchema.post(/^find/,function(doc,next){
    this.find({releaseDate:{$lte:Date.now()}})
    this.endtime = Date.now()
    const content = `Query took ${this.endtime - this.starttime} millisecond to fetch the documents.\n`
    fs.writeFileSync("./Log/log.txt",content,{flag :'a'},(err)=>{
        console.log(err.message);
    })
    next();
} ) 


//Aggregation middleware pre for correct data 

movieSchema.pre("aggregate",function(next){
    console.log(this.pipeline().unshift({$match :{releaseDate:{$lte : new Date()}}}))
    // {$match :{releaseDate:{$lte : new Date()}}},
    next();
})


//To make model

const Movie=mongoose.model("Movie",movieSchema)


module.exports = Movie;// //To create new Document
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
