const {resolve} = require('path')
const _ = require('lodash')
const Router = require('koa-router')
const glob = require('glob')

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

// 转换为数组格式
const isArray = c => _.isArray(c) ? c : [c]

export class Route {
    constructor(app, apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init() {
        // glob同步引入文件, 然后就开始执行文件里面的代码了，
        // 就开始通过@controller开始调用装饰器代码了，然后我们就有了routerMap
        glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
        
        // 可能一个routerPath 有多个方法, 所以controllers是个数组
        for(let [conf, controller] of routerMap) {
            const controllers = isArray(controller)
            let routerPrefix = conf.target[symbolPrefix]
            if (routerPrefix) routerPrefix = normalizePath(routerPrefix)
            let routerPath = routerPrefix + conf.path
            this.router[conf.method](routerPath, ...controllers)
        }

        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}

export const controller = path => target => {
    target.prototype[symbolPrefix] = path
}

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path)

    routerMap.set({
        target,
        ...conf,
    }, target[key])
}

export const get = path => router({
    path,
    method: 'get',
})

export const post = path => router({
    path,
    method: 'post',
})

// const get = path => router({
//     path,
//     method: 'GET',
// })