const path = require('path')
const { fork } = require('child_process')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')


;(async () => {
    const script = path.resolve(__dirname, '../crawler/trailer-list')
    const child = fork(script)
    // 是否有错误
    let invoked = false
    
    child.on('error', err => {
        if (invoked) return
        invoked = true
        console.log(err, 'error')
    })

    child.on('exit', code => {
        if (invoked) return
        invoked = false
        let err = code === 0 ? null : new Error('exit code ' + code)
        console.log(err)
    })
    
    child.on('message', data => {
        console.log(data)

        data.forEach(async item => {
            let movie = await Movie.findOne({
                doubanId: item.doubanId
            })

            if (!movie) {
                movie = new Movie(item)
                await movie.save()
            }
        })
    })
})()