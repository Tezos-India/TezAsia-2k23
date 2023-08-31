const express = require('express')
const Movie = require('../mongo/models/movieSchema')
const Theatre = require('../mongo/models/theatreSchema')
const theatreAuth = require('../middlewares/theatreAuth')
const userAuth = require('../middlewares/userAuth')

const router = new express.Router()

router.post('/addMovies', theatreAuth, async(req,res)=>{
    try {
        const movie = new Movie(req.body)
        await movie.save()
        res.send(movie)
    } catch (error) {
        res.send(error)
    }
})

router.post('/addTheatre',theatreAuth, async(req, res)=>{
    try {
        const movieId = req.body.movieId
        const theatreId = req.body.theatreId
        const movie = await Movie.findOne({_id:movieId})

        if(!movie){
            return res.status(404).send("Movie not found")
        }
        const theatre = await Theatre.findOne({_id:theatreId})
        if(!theatre){
            return res.status(404).send("Theatre not found")
        }
        if(theatreId !== req.theatre._id.toString()){
            return res.status(400).send("A theatre can only add or list itself")
        }
        if(movie.theatreId.includes(theatre._id)){
            return res.status(400).send("The theatre is already listed")
        }

        movie.theatreId.push(theatreId)
        await movie.save()
        res.send(movie)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getAllMovies', async(req,res)=>{
    try {
        const data = await Movie.find({}).populate("theatreId")
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getTheatres/:movieId',userAuth, async(req,res)=>{
    try {
        const movie = await Movie.findOne({_id:req.params.movieId}).populate("theatreId")
        const theatres = movie.theatreId
        res.send(theatres)

    } catch (error) {
        res.send(error)
    }
})


module.exports = router