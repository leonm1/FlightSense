
const sha1 = require('sha1');
const moment = require('moment-timezone');
const request = require('request-promise');
const cache = require('./cache.js');
const jsonminify = require('jsonminify')

let count = {
    api: 0,
    cache: 0
}

//processedTime is in UTC
async function getWeather(iata, lat, lon, processedTime) {

    const clonedTime = moment(processedTime);
    clonedTime.add(30, 'minutes').startOf('hour'); // rounds to nearest hour
    const hash = sha1(iata + clonedTime.format('X'));
    //console.log(hash);


    return new Promise((resolve, reject) => {
        try {
            let rtn = cache.get(hash);
            count.api++;

            //console.log('returned from cache');
            resolve(rtn);
        }
        catch (err) {
            const options = {
                uri: 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API_KEY + '/' + lat + ',' + lon + ',' + clonedTime.format('X'),
                json: true

            }
            count.cache++;

            return request(options).then(data => {
                //console.log('returned from api');

                aggressivelyCache(data, iata);
                resolve(data.currently);
            });
        }


    });

}

const aggressivelyCache = (darkSkyRtn, iata) => {

    Array.from(darkSkyRtn.hourly.data).forEach(element => {
        try { cache.set(hashShit(iata, element.time), element) } catch (err) { }
    });
}

const log = () => {
    if ((count.api + count.cache) % 30 === 0) console.log("API:CACHE:TOTAL", count.api, count, cache.count.api + count.cache)
}

const hashShit = (iata, epochTime) => {
    return sha1(iata + epochTime);
}

module.exports = getWeather;