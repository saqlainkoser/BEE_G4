const express=require('express')
const fs=require('fs')
const app=express();
// let movies=JSON.parse(fs.readFileSync('./data/movies.json'))
const Movie=require("./../Models/movieModel.js")

const ApiFeatures = require("./../Utils/ApiFeatures.js")

app.use(express.json())

exports.getHighestRated = (req,res,next)=>{
    req.query.limit = '5';
    req.query.sort = '-ratings'
    next()
}
//let query = Movie.find()
//let movies=await query;
exports.getAllMovies =async (req,res)=>{
    try{
        const features = new ApiFeatures(Movie.find(),req.query)
        .filter().sort().limitFields().paginate()

        let movies =await features.query;

        

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
        
        // let querystr = JSON.stringify(req.query);
        // console.log(querystr);
        
        // //REG EXP for replacing gte / lte / gt / lt to $gte / $lte / $gt / $lt
        // querystr=querystr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)

        // const queryObj= JSON.parse(querystr)
        // console.log(queryObj)
        // const movies =await Movie.find(req.query);

        // {duration:{$gte : 118}, gte}
        //conditions -  gte / lte / gt / lt
        //find({name="shaan",age:{$gte:18})

        //sorting data 
        // let query = Movie.find()
        // // console.log(req.query.sort);

        // if(req.query.sort){
        //     query = query.sort(req.query.sort)
        // }
        // // else{
        // //     query = query.sort("-createdAt")
        // // }

        //LIMITING FIELDS
        // if(req.query.fields){
        //     let fields = req.query.fields.split(',').join(" ")
        //     query = query.select(fields)
        // }
        
        //Pagination and Limits 
        // const page = req.query.page*1 || 1;
        // const limit = req.query.limit*1 || 10;

        // const skip = (page -1) * limit;
        // query = query.skip(skip).limit(limit);

        // if(req.query.page){
        //     const moviesCount = await Movie.countDocuments()
        //     if(skip>=moviesCount){
        //         throw new Error("This page is not found")
        //     }
        // }

        // const movies =await query;

        res.status(200).json({
            status:"success",
            length:movies.length,
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
        const newMovie=await Movie.create(req.body,{runValidators:true});
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

exports.deleteMovie =async (req,res)=>{
  
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    
        res.status(204).json({
            status:"success",
            data:{
                deletedMovie
            }
        });
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}



//Aggregation function for movie Stat --- 
exports.getMoviesStats = async(req,res) =>{
    try{
        //Aggregation function use to take summary like min ,max, avg ,sum etc.
        const  stats = await Movie.aggregate([
            // {$match :{releaseDate:{$lte : new Date()}}},
            //STAGE 1 to filter data
            {$match :{ratings:{$gte : 4}}},

            //STAGE 2 Grouping data 
            {$group :{
                _id:'$releaseYear',
                avgRating :{$avg : '$ratings'},
                avgPrice :{$avg : '$price'},
                minPrice :{$min : '$price'},
                maxPrice :{$max : '$price'},
                priceTotal:{$sum :'$price'},
                movieCount:{$sum : 1}
            }},

            //STAGE 3 to sort data ....
            {$sort: {minPrice : 1}}

        ])

        res.status(200).json({
            status:"success",
            length: stats.length,
            data:{
                stats
            }
        });


    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })  
    }
}


//Function to take movies by genre

exports.getMoviesByGenre =async (req,res)=>{
    try{
        const genre = req.params.genre;
        // console.log(genre)
        const movies = await Movie.aggregate([
            //Stage 1
            {$unwind : '$genres'},
            //Stage 2
            {$group :{
                _id:"$genres",
                movieCount:{$sum : 1},
                movies:{$push: "$name"}
            }},
            //Stage 3
            {$addFields :{genre :"$_id"} },
            //Stage 4
            {$project : {_id:0}},
            //Stage 5
            {$sort : {movieCount: -1}},
            //Stage 6
            {$match:{genre:genre}}
            
        ])

        res.status(200).json({
            status: "success",
            length:movies.length,
            data:{
                movies:movies
            }
        })

    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })  
    }
}