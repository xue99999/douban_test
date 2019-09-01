const {resolve} = require('path')

const mongoose = require('mongoose')
const glob = require('glob')

const db = 'mongodb://localhost/douban-test'

mongoose.Promise = global.Promise

exports.connect = () => {
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        
        mongoose.connect(db)

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                console.log('disconnected')
                throw new Error('数据库挂了')
            }
        })

        mongoose.connection.on('error', () => {
            maxConnectTimes++
            
            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                console.log('connect error')
                throw new Error('数据库挂了')
            }
        })

        mongoose.connection.once('open', () => {
            resolve()
            console.log('数据库连接成功')
        })

    })
}

exports.initScheme = () => {
    glob.sync(resolve(__dirname, 'scheme', '**/*.js')).forEach(require)
}