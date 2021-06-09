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



   // async function getData() {
   //     try {
   //         const siteUrl = 'https://www.daraz.com.np/catalog/?q=mask';
   //         const { data } = await axios({
   //             method: 'GET',
   //             url: siteUrl,
   //         })



   //         const eSelector = '#root > div > div.ant-row.c10-Cg > div.ant-col-24 > div > div.ant-col-20.ant-col-push-4.c1z9Ut > div.c1_t2i > div:nth-child(1)';

   //         const $ = cheerio.load(data)
   //         console.log($(eSelector).text());
   //         $(eSelector).each((parentIdx, parentElem) => {
   //             console.log(parentIdx);
   //             // if (parentIdx > 10) {
   //             //     $(parentElem).children().each((childIdx, childElem) => {
   //             //         console.log($(childElem).text());
   //             //     })
   //             // }
   //         })
   //     } catch (err) {
   //         console.error(err);
   //     }
   // }
   // getData();
   //}







   //  var ran = bundle.names[3];
   //  var pan = bundle.prices[3];
   //  console.log(ran, pan)







   // for (i = 0; i < total; i++) {


   //     namesJ[i].productName = bundle.names[i],
   //         namesJ[i].productPrice = bundle.prices[i]
   // }



   // const mainData = JSON.stringify(nameJ);
   // console.log(mainData);
   // var package = [];
   // for (i = 0; i < total; i++) {
   //     package.push(bundle.names[i]);
   //     package.push(bundle.prices[i]);
   // }
   // const mainData = JSON.stringify(package);
   // return mainData;



   // async function monitor() {
   //     const data = await scrapeData('sanitizer');
   //     console.log(data);