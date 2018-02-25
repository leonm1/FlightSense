const fs = require('fs');
const jsonminify = require("jsonminify");
const os = require('os');
const cache = {};



const parseFile = () => {
    fs.readFile('cache.txt', 'utf8', function (err, contents) {
        if (contents != null) {
            contents = contents.slice(0, -1);
            const lines = contents.split('\n');

            if (lines[0] === '') return;
            for (let i = 0; i < lines.length; i++) {

                let pair = splitOne(lines[i], '_');

                cache[pair[0]] = JSON.parse(pair[1]);
            }

            //console.log('ready!');
            //console.log(JSON.stringify(cache));
            //console.log(cache['6a2d012deb02905bad17290f8ad6dd751dba7a74']);



        }

    });

}

const get = (key) => {
    if (cache[key] == null) throw 'No such key/val pair exists'
    else return cache[key];

}


const set = (key, value) => {
    if(cache[key] !=null) throw "weather already set here"
    cache[key] = value;
    fs.appendFile("cache.txt", key + '_' + jsonminify(JSON.stringify(value)) + os.EOL, function (err) {
        if (err) {
            return console.log(err);
        }



    });

}


const splitOne = (s, chr) => {

    const i = s.indexOf(chr);
    const splits = [s.slice(0, i), s.slice(i + 1)];

    return splits;
}

parseFile();
module.exports = { 'get': get, 'set': set };