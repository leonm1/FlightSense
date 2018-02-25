
const sha1 = require('sha1');

const request = require('request-promise');
const cache = require('./cache.js');
const jsonminify = require('jsonminify')



//processedTime is in UTC
async function getWeather(lat, lon, processedTime) {

    processedTime.add(30, 'minutes').startOf('hour'); // rounds to nearest hour
    const hash = sha1(lat + processedTime.format('X') + lon);


    return new Promise((resolve, reject) => {
        try {
            let rtn = cache.get(hash);

            console.log('returned from cache');
            resolve(rtn);
        }
        catch (err) {
            const options = {
                uri: 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API_KEY + '/' + lat + ',' + lon + ',' + processedTime.format('X'),
                json: true

            }
            return request(options).then(data => {
                console.log('returned from api');

                aggressivelyCache(data, lat, lon);
                resolve(data.currently);
            });
        }
    });

}

const aggressivelyCache = (darkSkyRtn, lat, lon) => {

    Array.from(darkSkyRtn.hourly.data).forEach(element => {
        const hash = sha1(lat + element.time.toString() + lon);


        try { cache.set(hash, element) } catch (err) { }
    });
}



module.exports = getWeather;