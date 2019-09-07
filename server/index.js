const {resolve} = require('path')
const Koa = require('koa')
const R = require('ramda')
const { connect, initScheme } = require('./database/init')

const router = require('./routes/movie')
const MIDDLEWARES = ['routers']

const useMiddleware = app => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

;(async () => {
    await connect()

    initScheme()

    // require('./tasks/movie')
    // require('./tasks/trailer')

    const app = new Koa()
    await useMiddleware(app)

    app.listen(3000)

})()