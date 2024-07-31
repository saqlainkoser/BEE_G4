const express=require('express')
const moviesRouter = express.Router()
// const fs=require('fs')
// const app=express();
// let movies=JSON.parse(fs.readFileSync('./data/movies.json'))
// app.use(express.json())

const moviesControllers = require('./../Controllers/moviesControllers.js')

moviesRouter.route('/')
.get(moviesControllers.getAllMovies)
.post(moviesControllers.createMovie)

moviesRouter.route('/:id')
.get(moviesControllers.getMovie)
.patch(moviesControllers.updateMovie)
.delete(moviesControllers.deleteMovie)

module.exports = moviesRouter ;