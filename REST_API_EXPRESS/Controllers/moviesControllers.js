const express=require('express')
const fs=require('fs')
const app=express();
// let movies=JSON.parse(fs.readFileSync('./data/movies.json'))
const Movie=require("./../Models/movieModel.js")


app.use(express.json())

exports.getAllMovies =async (req,res)=>{
    try{
        // console.log(req.query);
        //Filtering by URL
        // const movies =await Movie.find(req.query);
        // const movies =await Movie.find({"duration":req.query.duration,"ratings":req.query.ratings});
        // const movies =await Movie.find()
        //                 .where('duration')
        //                 .equals(req.query.duration)
        //                 .where('ratings')
        //                 .equals(req.query.ratings)

        //PERMANENT SOLUTION FOR Filtering 

        // const excludeFields = ['sort','page','limit','fields']
        // console.log(req.query)
        // const queryObj=req.query
        // console.log(queryObj)

        // excludeFields.forEach((el)=>{
        //    delete queryObj[el]
        // })

        // console.log(queryObj);
        // const movies =await Movie.find(req.query);
        
        let querystr = JSON.stringify(req.query);
        console.log(querystr);
        
        //REG EXP for replacing gte / lte / gt / lt to $gte / $lte / $gt / $lt
        querystr=querystr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)

        const queryObj= JSON.parse(querystr)
        console.log(queryObj)
        const movies =await Movie.find(req.query);

        // {duration:{$gte : 118}, gte}
        //conditions -  gte / lte / gt / lt
        //find({name="shaan",age:{$gte:18})




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
