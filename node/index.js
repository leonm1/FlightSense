const airportsjs = require('airportsjs');
const airport_tz = require('airport-tz');
const rp = require('request-promise');
const moment = require('moment-timezone');



async function getDateInfo(code, time) {
    const tz = airport_tz.findWhere({ iata: code });
    const airport = airportsjs.lookupByIataCode(code);


    let weather = await getWeather(airport.latitude, airport.longitude, time, tz.get('timezone'));
    return { 'tz': tz.utcOffset(), 'weather': weather }


}

async function getWeather(lat, lon, time, timezone) {
    let mmnt = moment.tz(time, timezone);
    let utcTimeUnixStart = moment.tz(mmnt, 'Europe/London').format('X');
    let utcTimeUnixEnd = moment.tz(mmnt, 'Europe/London').add(1, 'hours').format('X');


    const options = {
        uri: 'http://history.openweathermap.org/data/2.5/history/city',
        qs: {
            'lat': lat,
            'lon': lon,
            'type': 'hour',
            start: utcTimeUnixStart,
            end: utcTimeUnixEnd


        },
        json: true // Automatically parses the JSON string in the response
    };
    return rp(options);
}

getDateInfo('ORD', '2014-06-01T12:00:00Z').then(data => console.log(data));