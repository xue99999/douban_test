// 这里是glob用法测试
const glob = require('glob')
const {resolve} = require('path')
glob.sync(resolve(__dirname, './demo', '**/*.js')).forEach(require)
