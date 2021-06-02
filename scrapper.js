const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.daraz.com.np/');
    await page.click('[name=q]');
    await page.keyboard.type("Watches");
    await page.keyboard.press('Enter');
    await page.waitForSelector('.c2prKC', { timeout: 10000 });
    const [el] = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/a');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();
    console.log(name);
    // const attr = await page.$$eval("a", el => el.map(x => x.getAttribute("title")));

    //const hrefElement = await page.$x('//*[@id="Level_1_Category_No6"]/a/span');
    //await hrefElement.click();
    // ...
})();