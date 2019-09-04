const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router()
const Movie = mongoose.model('Movie')


router.get('/movies', async (ctx, next) => {
    let movies = await Movie.find().sort({
        'meta.createAt': -1
    })

    ctx.body = {
        movies
    }

})

router.get('/movies/detail/:id', async (ctx, next) => {
    const id = ctx.params.id
    let movie = await Movie.findOne({_id: id})

    ctx.body = {
        movie
    }
})

module.exports = router