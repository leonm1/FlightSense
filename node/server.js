const http = require('http');
const index = require('./index.js');
const url = require('url');

//create a server object:
http.createServer(function (req, res) {

    
    const query = url.parse(req.url, true).query;
    console.log(query);
    index(query.code.toUpperCase(), query.time).then((data) => {
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify(data));
        res.end();
    })

}).listen(80); //the server object listens on port 8080