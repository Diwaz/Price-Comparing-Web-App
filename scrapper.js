const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.daraz.com.np/');
    await page.click('[name=q]');
    await page.keyboard.type("Mask");
    await page.keyboard.press('Enter');
    await page.waitForSelector('.c2prKC', { timeout: 10000 });
    const [el1] = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/a');
    const text1 = await el1.getProperty('textContent');
    const name = await text1.jsonValue();
    const [el] = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div[2]/div[3]/span');
    const text2 = await el.getProperty('textContent');
    const price = await text2.jsonValue();
    console.log(name, price);
    // const attr = await page.$$eval("a", el => el.map(x => x.getAttribute("title")));

    //const hrefElement = await page.$x('//*[@id="Level_1_Category_No6"]/a/span');
    //await hrefElement.click();
    // ...
})();