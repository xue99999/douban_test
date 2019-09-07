const mongoose = require('mongoose')

export const getMovies = async () => {
    const Movie = mongoose.model('Movie')
    let movies = await Movie.find()
    return movies
}

export const getMovieDetail = async (id) => {
    const Movie = mongoose.model('Movie')
    let movie = await Movie.findOne({_id: id})
    return movie
}