const fs = require('fs');
const jsonminify = require("jsonminify");

const cache = {};

fs.readFile('cache.txt', 'utf8', function (err, contents) {
    const lines = contents.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let pair = splitOne(lines[i]);
        cache[pair[0]] = pair[1];
    }
});

const get = (key) => {
    if (cache[key] != null) throw 'No such key/val pair exists'
    else return cache[key];

}


const set = (key, value) => {
    cache[key] = value;
    fs.writeFile("cache.txt", key + '_' + jsonminify(value) + '\n', function (err) {
        if (err) {
            return console.log(err);
        }


    });

}


const splitOne = (s) => {
    const i = s.indexOf('|');
    const splits = [s.slice(0, i), s.slice(i + 1)];
    return splits;
}

module.exports = { 'get': get, 'set': set };