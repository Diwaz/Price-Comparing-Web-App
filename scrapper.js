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

    const result = await names.map((prodName, index) => {

        return {
            id: index,
            prodName,
            prodPrice: prices[index]
        }
    });
    console.log(result);
    browser.close()
}
scrapeData('mask');