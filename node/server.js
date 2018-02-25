const http = require('http');
const index = require('./index.js');
const url = require('url');

let count = 0;
//create a server object:
http.createServer(function (req, res) {

    if(count++ % 1000 ===0) console.log('hit: ', count);
    const query = url.parse(req.url, true).query;

  //  console.log(query);
    if (query.code == null || query.time == null || query.code =='' || query.time == '') {
        res.statusMessage = 400;
        res.end();
        return;
    }

    index(query.code.toUpperCase(), query.time).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    }).catch(err => {
        res.statusMessage = 400;
        res.end();

    }
    );

}).listen(80); //the server object listens on port 808
0
http.createServer(function (req, res) {

    if(count++ % 1000 ===0) console.log('hit: ', count);
    const query = url.parse(req.url, true).query;

  //  console.log(query);
    if (query.code == null || query.time == null || query.code =='' || query.time == '') {
        res.statusMessage = 400;
        res.end();
        return;
    }

    index(query.code.toUpperCase(), query.time).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    }).catch(err => {
        res.statusMessage = 400;
        res.end();

    }
    );

}).listen(81); //the server object listens on port 8080

http.createServer(function (req, res) {

    if(count++ % 1000 ===0) console.log('hit: ', count);
    const query = url.parse(req.url, true).query;

  //  console.log(query);
    if (query.code == null || query.time == null || query.code =='' || query.time == '') {
        res.statusMessage = 400;
        res.end();
        return;
    }

    index(query.code.toUpperCase(), query.time).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    }).catch(err => {
        res.statusMessage = 400;
        res.end();

    }
    );

}).listen(82); //the server object listens on port 8080

http.createServer(function (req, res) {

    if(count++ % 1000 ===0) console.log('hit: ', count);
    const query = url.parse(req.url, true).query;

  //  console.log(query);
    if (query.code == null || query.time == null || query.code =='' || query.time == '') {
        res.statusMessage = 400;
        res.end();
        return;
    }

    index(query.code.toUpperCase(), query.time).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    }).catch(err => {
        res.statusMessage = 400;
        res.end();

    }
    );

}).listen(83); //the server object listens on port 8080

http.createServer(function (req, res) {

    if(count++ % 1000 ===0) console.log('hit: ', count);
    const query = url.parse(req.url, true).query;

  //  console.log(query);
    if (query.code == null || query.time == null || query.code =='' || query.time == '') {
        res.statusMessage = 400;
        res.end();
        return;
    }

    index(query.code.toUpperCase(), query.time).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    }).catch(err => {
        res.statusMessage = 400;
        res.end();

    }
    );

}).listen(84); //the server object listens on port 8080

