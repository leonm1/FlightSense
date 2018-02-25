async function getAirportLocation(code) {

    return new Promise((resolve, reject) => {

        // BROKEN

        fetch('https://airport-information.azurewebsites.net/api/azure-function?code=' + code, {
            method: 'get',
            mode: 'no-cors'
        }).then(function (response) {
            // Convert to JSON
            return response.json();
        }).then(function (j) {
            // Yay, `j` is a JavaScript object
            console.log(j);
        });
    })
}



document.getElementById('submit').addEventListener('click', async function () {
    let flightInfo = {};
    flightInfo.from = await getAirportLocation(document.getElementById('from').value);
    flightInfo.to = await getAirportLocation(document.getElementById('to').value);
    //   console.log(flightInfo);
    drawLine(flightInfo.from, flightInfo.to);
});


