const { connect, initScheme } = require('./database/init')

;(async () => {
    await connect()
    
    initScheme()

    // require('./tasks/movie')
    require('./tasks/trailer')

})()