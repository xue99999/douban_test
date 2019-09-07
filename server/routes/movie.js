const Router = require('koa-router')

const {controller, get} = require('../lib/decorator')
const { getMovies, getMovieDetail } = require('../service/movie')

const router = new Router()

@controller('/api/v0/movies')
class movieController {
    @get('/')
    async getMovies(ctx, next) {
        const movies = await getMovies()
        ctx.body = {
            movies
        }
    }

    @get('/:id')
    async getMovieDetail(ctx, next) {
        const id = ctx.params.id
        const movie = await getMovieDetail(id)
    
        ctx.body = {
            movie
        }
    }
}