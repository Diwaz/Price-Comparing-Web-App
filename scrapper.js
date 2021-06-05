const puppeteer = require('puppeteer');
const cheerio = require('cheerio');



async function configureBrower() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.daraz.com.np/');
    return { page, browser };
}

async function checkPrice(page) {
    await page.click('[name=q]');
    await page.keyboard.type("Sanitizer");
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
    const nameparse = naam => {
        if (naam.length > 10) {
            return naam.split(' ').slice(0, 5).join(" ");
        }
        return naam;
    }
    for (i = 0; i < 5; i++) {
        console.log(nameparse(names[i]) + '...', prices[i]);
    }


    // const [el1] = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/a');
    // const text1 = await el1.getProperty('textContent');
    // const name = await text1.jsonValue();
    // const [el] = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div[2]/div[3]/span');
    // const text2 = await el.getProperty('textContent');
    // const price = await text2.jsonValue();
    // console.log(name, price)
    // return {
    //     prodName,
    //     prodPrice
    // }
}

async function monitor() {
    let { browser } = await configureBrower();
    try {
        let { page } = await configureBrower();
        await checkPrice(page);

    } catch {
        console.log('error')
    } finally {
        await browser.close()
    }


    // names = datas.prodName;
    // price = datas.prodPrice;
    // console.log(names, price);

}
monitor();










// (async() => {


//     const elements = await page.$$eval('.c2prKC', (options) =>
//   options.map((option) => option.)
// );

// let elements = page.$$('.c2prKC');
// console.log(elements[0])
// for (i = 0; i < elements.length; i++) {
//     console.log('(elements[i])');


// }
//     async page.$$eval('.c2prKC', (options) =>
//         options.map((option) => {
//                 const [pname] = await option.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/a');
//                 const jname = await pname.getProperty('textContent');
//                 const name = await jname.jsonValue();
//             }

//         )
//     );
//     console.log(divCount);


//     //console.log(name, price);

// })();