// Get your Data insert into Mongodb from JSON file

// Write a JS code to post all your data from JSON file to MongoDB 

//steps
//import all libraries
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:"./config.env"})
const fs=require('fs');
const Movie=require('./../Models/movieModel.js')

//code to connect  mongodb to your node app
//TO CONNECT 
// console.log(process.env.CONN_STR);
mongoose.connect(process.env.CONN_STR)
.then((conn)=>{
    console.log("DB Connection Successfull");
}).catch((error)=>{
    console.log("some error has occured");
})

//Reading JSON file
const movies=JSON.parse(fs.readFileSync('./data/movies.json'))

//write a function which will delete all data from your collection (movies)
//DELETE ALL DATA FROM MONGODB COLLECTION
const deleteMovies =async (req,res)=>{
    try{
     const updateMovie=await Movie.deleteMany();
     console.log("DATA DELETED!");
     }catch(err){
        console.log(err.message);
         } 
 }

 //Insert ALL DATA into MONGODB COLLECTION
 //write a function which will Dump all data from json (movies.json) to Mongodb.
const dumpMovies =async (req,res)=>{
    try{
     const updateMovie=await Movie.create(movies);
     console.log("Data added successfully!");
     }catch(err){
        console.log(err.message);
         } 
 }

console.log(process.argv[2]); 

if(process.argv[2] === '--delete'){
    deleteMovies();
}
if(process.argv[2] === '--upload'){
    dumpMovies();
}


