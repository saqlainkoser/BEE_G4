const express=require('express')
const fs=require('fs')
const app=express();
// let movies=JSON.parse(fs.readFileSync('./data/movies.json'))
const Movie=require("./../Models/movieModel.js")


app.use(express.json())

exports.getAllMovies =async (req,res)=>{
    try{
        const movies =await Movie.find();
        res.status(200).json({
            status:"success",
            data:{
                movies
            }
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    } 
}

exports.createMovie = async(req,res)=>{
    try{
        const newMovie=await Movie.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                newMovie
            }
        })
        // console.log(req.body);
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }        
}

//to update movie
exports.updateMovie =async (req,res)=>{
   try{
    const updateMovie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    res.status(200).json({
        status:"success",
        data:{
            movie:updateMovie
        }
    
    })
    }catch(err){
            res.status(400).json({
                status:"fail",
                message:err.message
            })
        } 

}



//to get single movie
exports.getMovie =async(req,res)=>{
    try{
        const movie=await Movie.findById({_id:req.params.id})
        res.status(200).json({
            status:"success",
            data:{
                movie
            }
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
   
}

exports.deleteMovie = (req,res)=>{
  

}
