const puppeteer = require('puppeteer')

const listUrl = 'https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=电影'

// 让浏览器主动等待
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.log('Start visit the target page')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(listUrl, {waitUntil: 'networkidle2'});

    // 异步写法
    await sleep(3000)

    // 等待加载更多按钮出现
    await page.waitForSelector('.more')

    // 加载多页数据实现
    for (let i = 0; i < 5; i++) {
        await sleep(3000)
        await page.click('.more')
    }

    const result = await page.evaluate(() => {
        const $ = window.$
        const movieArr = []

        $('.list-wp .item').each((idx, item) => {
            movieArr.push({
                doubanId: $(item).find('div.cover-wp').attr('data-id'),
                title: $(item).find('span.title').text(),
                poster: $(item).find('img').attr('src'),
            })
        })

        return movieArr
    })

    console.log('result--', result)

    await browser.close();

    process.send(result)
    process.exit(0)
})()