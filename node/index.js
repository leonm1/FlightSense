require('dotenv').config()

const airportsjs = require('airportsjs');
const airport_tz = require('airport-tz');
const rp = require('request-promise');
const moment = require('moment-timezone');
const forecast = require('./weather.js');


async function getDateInfo(code, time) {
    const tz = airport_tz.findWhere({ iata: code });
    const airport = airportsjs.lookupByIataCode(code);


    const processedTime = processRawTime(time, tz.get('timezone'));
  
    
    let weather = await forecast(airport.latitude, airport.longitude, processedTime.time);

    processedTime.time = processedTime.time.format('X');
    
    return { processedTime, 'weather': weather };

}

const processRawTime = (rawTime, timezone) => {
    const nativeTime = moment.tz(rawTime, timezone);
   
    const utcTime = nativeTime.clone().tz('Etc/UTC');
 

    return { 'dst': nativeTime.isDST(), 'time': utcTime };
}

module.exports = getDateInfo;
//setTimeout(() => { getDateInfo('ORD', '2014-06-01T12:00:00Z').then(data => console.log(data)) }, 1500);