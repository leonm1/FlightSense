require('dotenv').config()

const airportsjs = require('airportsjs');
const airport_tz = require('airport-tz');
const rp = require('request-promise');
const moment = require('moment-timezone');
const forecast = require('./weather.js');


async function getDateInfo(code, time) {
    const tz = airport_tz.findWhere({ iata: code });
    const airport = airportsjs.lookupByIataCode(code);


    let weather = await forecast(airport.latitude, airport.longitude,time, tz.get('timzeone'));
    return { 'tz': tz.utcOffset(), 'weather': weather }


}


getDateInfo('ORD', '2014-06-01T12:00:00Z').then(data => console.log(data));