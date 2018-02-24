
const sha1 = require('sha1');
const moment = require('moment-timezone');
const request = require('request-promise');
const cache = require('./cache.js');



async function getWeather(lat, lon, rawTime, timezone) {
    const nativeTime = moment.tz(rawTime, timezone);
    const utcTime = nativeTime.tz('Europe/London');
    utcTime.add(30, 'minutes').startOf('hour'); // rounds to nearest hour
    const hash = sha1(lat + utcTime.format() + lon);


    
    return new Promise((resolve, reject) => {
        cache.get(hash)
            .then(result => resolve(result))
            .catch((err) => {

                const url = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API_KEY + +'/' + lat + ',' + lon + ',' + utcTime;

                const options = {
                    uri: url,
                    json: true
                }
                return rp(options).then(result => resolve(result)).catch(err => reject(err));

            });

    })

}
;
module.exports = getWeather;