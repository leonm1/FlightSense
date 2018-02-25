'use strict';
const fetch = require("node-fetch");


module.exports.hello = (event, context, callback) => {
  //console.log(process.env.APIKEY);
try {
  let orgAirport = event.queryStringParameters.orgAirport;
  let destAirport = event.queryStringParameters.destAirport;
  let searchDate = event.queryStringParameters.searchDate;
  //process.env.apikey
  let url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=APIKEY&origin=ORG&destination=DEST&departure_date=DATE'
  url = url.replace("APIKEY", process.env.apikey);
  url = url.replace("ORG", orgAirport);
  url = url.replace("DEST", destAirport);
  url = url.replace("DATE", searchDate);
  let operatingAirline = "";
  let departureTime = "";
  let total_price = "";
  fetch(url) 
  .then( results => {
    return results.json();
  }).then( data => {
    let flightlist = data.results[0];
    operatingAirline = flightlist.itineraries[0].outbound.flights[0].operating_airline;
    console.log(flightlist.itineraries[0].outbound.flights[0].operating_airline);
    departureTime = flightlist.itineraries[0].outbound.flights[0].departs_at;
    console.log(flightlist.itineraries[0].outbound.flights[0].departs_at);
    total_price = flightlist.fare.total_price;
    console.log(flightlist.fare.total_price);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        opAirline: operatingAirline,
        departTime: departureTime,
        price: total_price,
      }),
    };
    callback(null, response);
  })

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     opAirline: operatingAirline,
  //     departTime: departureTime,
  //     price: total_price,
  //   }),
  // };
  //callback(null, response);

} catch (err) {
  console.log(err);
  const response = {
    statusCode: 403,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "content-type": "text/plain"
    },
    body: "Malformed request."
    
  };

  callback(null, response);
}
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
