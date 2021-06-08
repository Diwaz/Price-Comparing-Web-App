const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { next } = require('cheerio/lib/api/traversing');



async function scrapeData(product) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.daraz.com.np/', {
        waitUntil: 'load',
        timeout: 0
    });

    //}

    //async function checkPrice(page) {
    await page.click('[name=q]');
    await page.keyboard.type(product);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.c2prKC', { timeout: 30000 });
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
    // rname = JSON.stringify(names);
    // rprod = JSON.stringify(prices);
    // const nameparse = naam => {
    //     if (naam.length > 10) {
    //         return naam.split(' ').slice(0, 5).join(" ");
    //     }
    //     return naam;
    // }
    // const looper = names.map(n => {
    //         if (n.length > 10) {
    //             return n.split(' ').slice(0, 5).join(" ");
    //         }
    //         return n;
    //     })
    // for (i = 0; i < 5; i++) {
    //     console.log(nameparse(names[i]) + '...', prices[i]);
    // }
    return {
        names,
        prices

    }
}


//}

//async function monitor() {
// let { browser } = await configureBrower();
// try {
//     let { page } = await configureBrower();
//     const bundle = await checkPrice(page);
//     const total = (bundle.names).length;


// //  var ran = bundle.names[3];
// //  var pan = bundle.prices[3];
// //  console.log(ran, pan)
//      var namesJ = {
//          productName: '',
//          productPrice: ''
//      }
//      for (i = 0; i < total; i++) {


//          namesJ[i].productName= bundle.names[i],
//          namesJ[i].productPrice= bundle.prices[i]
//      }



// const mainData = JSON.stringify(nameJ);
// console.log(mainData);
//     var package = [];
//     for (i = 0; i < total; i++) {
//         package.push(bundle.names[i]);
//         package.push(bundle.prices[i]);
//     }
//     const mainData = JSON.stringify(package);
//     return mainData;

// } catch {
//     console.log('error')
// } finally {
//     await browser.close()
// }
// async function monitor() {
//     const data = await scrapeData('sanitizer');
//     console.log(data);
// }
// monitor();
module.exports = {
    scrapeData
}