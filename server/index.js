const Koa = require('koa')
const { connect, initScheme } = require('./database/init')

const router = require('./routes/movie') 

;(async () => {
    await connect()
    
    initScheme()

    // require('./tasks/movie')
    // require('./tasks/trailer')

    const app = new Koa()
     app
         .use(router.routes())
         .use(router.allowedMethods())

    app.listen(3000)

})()