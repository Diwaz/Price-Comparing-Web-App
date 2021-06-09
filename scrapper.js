const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { next } = require('cheerio/lib/api/traversing');




async function configureBrower() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.daraz.com.np/', {
        waitUntil: 'load',
        timeout: 0
    })
    return page;
};



async function checkPrice(page) {
    await page.click('[name=q]');
    await page.keyboard.type('sanitizer');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.c2prKC', { timeout: 10000 });
    let html = await page.evaluate(() => document.body.innerHTML);

    let $ = cheerio.load(html);
    const names = []
    const prices = []
    $('.c16H9d', html).each(function() {
        let prodName = $(this).text();
        names.push(prodName);
    });
    $('.c3gUW0', html).each(function() {
        let prodPrice = $(this).text();
        prices.push(prodPrice);
    });


    return {
        names,
        prices

    }
}



async function monitor() {


    let page = await configureBrower();
    const bundle = await checkPrice(page);
    const total = (bundle.names).length;



    var keys = [
        'id',
        'name',
        'price'
    ]
    const mainData = {

    }

    console.log(bundle.names)
    console.log(bundle.prices)


}
monitor();