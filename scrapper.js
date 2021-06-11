const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');



async function scrapeData(product) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.daraz.com.np/', {
        waitUntil: 'load',
        timeout: 0
    })

    await page.click('[name=q]');
    await page.keyboard.type(product);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.c2prKC', { timeout: 20000 });
    let html = await page.evaluate(() => document.body.innerHTML);

    let $ = cheerio.load(html);
    const names = []
    const prices = []
    const imgUrl = []
    const link = []
    $('.c16H9d', html).each(function() {
        let prodName = $(this).text();
        names.push(prodName);
    });
    $('.c3gUW0', html).each(function() {
        let prodPrice = $(this).text();
        prices.push(prodPrice);
    });
    $('.c1ZEkM', html).each(function() {

        let prodImg = $(this).attr('src');
        imgUrl.push(prodImg);
    });
    $('.cRjKsc', html).each(function() {

        let prodLink = $(this).find('a').attr('href');
        link.push(prodLink);
    });

    console.log(link);

    const result = await names.map((prodName, index) => {

        return {
            id: index,
            prodName,
            prodPrice: prices[index],
            imgUrl: imgUrl[index],
            link: link[index]
        }
    });
    browser.close();
    return result;

}
scrapeData('mask');


// setting express server
app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type,Authorization');
    next();
});

app.get('/data/api', async(req, res) => {
    try {
        const prodData = await scrapeData('mask');
        return res.status(200).json({
            data: prodData
        })
    } catch (err) {
        return res.status(500).json({
            err: err.toSring(),
        })
    }
})

app.listen(8080);