const { response } = require("express");




search.addEventListener('click', getData);

async function getData() {
    const search = document.getElementById('Prod').value;
    // let header = new Headers({
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'multipart/form-data'
    // });
    // let sentData = {
    //     method: 'GET',
    //     mode: 'cors',
    //     header: header,
    // };
    listing = document.getElementById('hid');
    listing1 = document.getElementById('hid2');
    console.log('started')
    console.log(search)
    fetch(`http://localhost:8080/data/api/daraz/${search}`)
        .then(res => res.json())
        .then(resText => {
            let html = '';
            console.log(resText)
                // if (responseText.data) {
            resText.data.forEach(product => {
                html += `
                    <div>
                    <p>${product.id}</p>
                    <p>${product.prodName}</p>
                    <p>${product.prodPrice}</p>
                    <p>${product.site}</p>
                    </div>
                    </br>
                    `
            })




            // };
            listing.innerHTML = html;

        })

    .catch(err => {
        console.log(err);

    });
    fetch(`http://localhost:8080/data/api/sasto/${search}`)
        .then(res => res.json())
        .then(resText => {
            let html1 = '';
            console.log(resText)
                // if (responseText.data) {
            resText.data.forEach(product => {
                html1 += `
                <div>
                <p>${product.id}</p>
                <p>${product.prodName}</p>
                <p>${product.prodPrice}</p>
                <p>${product.site}</p>
                </div>
                </br>
                `
            })




            // };
            listing1.innerHTML = html1;
        })

    .catch(err => {
        console.log(err);

    });


}

// function searched() {
//     var product = document.getElementById('Prod').value;
//     //datas.innerHTML = product;
//     document.getElementById('hid').innerHTML = '1.' + product;
// }