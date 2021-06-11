async function getData() {
    // let header = new Headers({
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'multipart/form-data'
    // });
    // let sentData = {
    //     method: 'GET',
    //     mode: 'cors',
    //     header: header,
    // };
    console.log('started')
    fetch('http://localhost:8080/data/api')
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            //console.log(err);

        });


}

function searched() {
    var product = document.getElementById('Prod').value;
    //datas.innerHTML = product;
    document.getElementById('hid').innerHTML = '1.' + product;
}