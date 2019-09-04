const path = require('path')
const { fork } = require('child_process')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

// 爬取电影详情信息
// 先查询么有详情数据的电影，然后通过进程间通信，子进程去爬取，爬取完告诉父进程

;(async () => {
    const script = path.resolve(__dirname, '../crawler/video')
    const child = fork(script)
    // 是否有错误
    let invoked = false

    // 没有video的数据
    let movies = await Movie.find({
        $or: [
            {video: { $exists: false }},
            {video: null}
        ]
    })

    console.log('没有video的电影个数 =>', movies.length)

    child.send(movies)
    
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
    
    child.on('message', async data => {
        let { doubanId } = data
        let movie = await Movie.findOne({
            doubanId,
        })

        if (data.video) {
            movie.video = data.video
            movie.cover = data.cover

            await movie.save()
        } else {
            await movie.remove()
        }
    })
})()