const http = require('http');
const index = require('./index.js');
const url = require('url');

//create a server object:
http.createServer(function (req, res) {

    const query = url.parse(req.url, true).query;
   
    index(query.code.toUpperCase(), query.time).then((data) => {
        res.write(JSON.stringify(data));
        res.end();
    })

}).listen(8080); //the server object listens on port 8080