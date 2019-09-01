const puppeteer = require('puppeteer')

const baseUrl = 'https://movie.douban.com/subject/'
const doubanId = '27024903'

const detailUrl = baseUrl + doubanId

// 拿到link, video, cover

// 让浏览器主动等待
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.log('Start visit the target page')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(detailUrl, {waitUntil: 'networkidle2'});

    // 异步写法
    await sleep(3000)

    const result = await page.evaluate(() => {
        const $ = window.$

        const cover = $('#mainpic img').attr('src')
        const link = $('.related-pic-video').attr('href')
        
        return {
            cover,
            link,
        }
    })

    let video

    if (result.link) {
        await page.goto(result.link, {waitUntil: 'networkidle2'})
        
        await sleep(3000)

        video = await page.evaluate(() => {
            const $ = window.$
            return $('source').attr('src')
        })
    }
    
    const data = {
        doubanId,
        video,
        cover: result.cover,
    }

    console.log('data--', data)

    await browser.close();

    // process.send(result)
    // process.exit(0)
})()