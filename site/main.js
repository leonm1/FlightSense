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


document.getElementById("submit").addEventListener("click", getPrice);

async function getPrice() {
    let origin = document.getElementById("from");
    let destination = document.getElementById("to");
    let date = document.getElementById("when");
    let url = "https://lc5ey0wgcj.execute-api.us-east-1.amazonaws.com/dev?orgAirport=ORG&destAirport=DEST&searchDate=DATE";
    url = url.replace("ORG", origin.value);
    url = url.replace("DEST", destination.value);
    url = url.replace("DATE", date.value.substr(0,10));
    let opAir = "";
    let depTime = "";
    let ticketPrice = "";
        return new Promise((resolve, reject) => {
    
            // BROKEN
    
            fetch(url, {
                method: 'get',
               // mode: 'no-cors'
            }).then( results => {
                return results.json();
              }).then( data => {
                opAir = data.opAirline;
                depTime = data.departTime;
                ticketPrice = data.price;
                document.getElementById("carrier").innerHTML = "Carrier: " + opAir;
                document.getElementById("time").innerHTML = "Time: " + depTime;
                document.getElementById("price").innerHTML = "Price: $" + ticketPrice;
              })
        })
    }