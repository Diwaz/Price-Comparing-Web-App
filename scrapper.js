const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const axios = require('axios');




async function darazData(product) {
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


    const result = await names.map((prodName, index) => {

        return {
            id: index,
            prodName,
            prodPrice: prices[index],
            imgUrl: imgUrl[index],
            link: link[index],
            site: 'daraz'
        }
    });
    browser.close();
    return result;

}
async function sastoData(product) {
    //    
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation()
    await page.goto(`https://www.sastodeal.com/catalogsearch/result/?q=${product}`)


    // await page.click('[name=q]');
    // await page.keyboard.type(product);
    // await page.keyboard.press('Enter');
    // await navigationPromise;
    await page.waitForSelector('.item:nth-child(1) > .product-item-info > .product > .product > .product-item-link')

    let html = await page.evaluate(() => document.body.innerHTML);

    let $ = cheerio.load(html);
    const names = []
    const prices = []
    const imgUrl = []
    const link = []
    $('.product-item-link').each(function() {
        let prodName = $(this).text();
        names.push(prodName);
    });
    $('.price').each(function() {
        let prodPrice = $(this).text();
        let rPrice = prodPrice.split(' ');

        prices.push(rPrice[1]);
    });
    $('.product-image-photo').each(function() {
        let prodImg = $(this).attr('src');
        imgUrl.push(prodImg);
    });
    $('.product-item-link').each(function() {
        let prodLink = $(this).attr('href');
        link.push(prodLink);
    });









    const result = await names.map((prodName, index) => {

        return {
            id: index,
            prodName,
            prodPrice: prices[index],
            imgUrl: imgUrl[index],
            link: link[index],
            site: 'sastoDeal'
        }
    });
    browser.close();
    return result;

}




// setting express server
app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type,Authorization');
    next();
});

app.get(`/data/api/sasto/:product`, async(req, res) => {
    let draft = req.params.product;
    console.log(draft);
    let prod = draft.split('%20').join(' ');

    try {
        const prodData = await sastoData(prod);
        return res.status(200).json({
            data: prodData
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
        })
    }
})
app.get(`/data/api/daraz/:product`, async(req, res) => {
    let prod = req.params.product;
    console.log(prod);
    try {
        const prodData = await darazData(prod);
        return res.status(200).json({
            data: prodData
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
        })
    }
})

app.listen(8080);