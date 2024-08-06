const express=require('express')
const moviesRouter = express.Router()
// const fs=require('fs')
// const app=express();
// let movies=JSON.parse(fs.readFileSync('./data/movies.json'))
// app.use(express.json())
const moviesControllers = require('./../Controllers/moviesControllers.js')


//Making route for higest-rated movies top 5 with middleware 
moviesRouter.route('/higest-rated')
.get(moviesControllers.getHighestRated,moviesControllers.getAllMovies)


moviesRouter.route('/')
.get(moviesControllers.getAllMovies)
.post(moviesControllers.createMovie)

moviesRouter.route('/:id')
.get(moviesControllers.getMovie)
.patch(moviesControllers.updateMovie)
.delete(moviesControllers.deleteMovie)

module.exports = moviesRouter ;