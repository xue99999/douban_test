# 做一个电影爬虫，需要哪些东西
1、爬虫
2、数据库(moogedb)
3、网站用来展示数据（后台做接口，前端做页面）

## 爬虫
父进程调用子进程去爬取数据


## 装饰器（重点）
想实现的效果
``` javascript
    @controller('/api/v0/movies')
    export class movieController {
        @get('/')
        @login
        @admin(['developer'])
        @log
        async getMovies (ctx, next) {
            // 业务代码
        }
    }
```

> test.js 为装饰器的简单demo

### glob模块
初始化数据库的时候用到了
引入routes模块用到了
``` javascript
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
```

引入文件，自己去执行自己的代码
