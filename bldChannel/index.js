'use strict';

let http = require('http'),
    express = require('express'),
    db = require('./db'),
    async = require('async'),
    bodyParser = require('body-parser');

var urlEncoded = bodyParser.urlencoded({extended: false});

console.log('server is started');

let app = express();
app.use(express.static('bldChannel'));
let server = app.listen('3001', () => {
    // console.log(server.address().address);
    // console.log(server.address().port);
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});
app.get('/queryChannel', (request, response) => {
    db.query((result) => {
        response.send(result);
    });
});
app.post('/addChannel', urlEncoded, (request, response) => {
    console.log(request.body);
    if (request.body.app_name === null || request.body.app_name === '') {
        request.body.app_name = '名校贷白领版';
    }
    if (request.body.p_id === null || request.body.p_id === '') {
        request.body.p_id = 1;
    }
    db.addChannel(request.body, (result) => {
        // response.sendFile(__dirname + '/index.html');
        response.send(JSON.stringify(result));
        response.end();
    });
});
app.post('/deleteChannelByIds', urlEncoded, (request, response) => {
    console.log(request.body);
    db.deleteChannelByIds(request.body.ids, (result) => {
        // response.sendFile(__dirname + '/index.html');
        response.send(JSON.stringify(result));
        response.end();
    });
});


// http.get(function (request, response) {
//     console.log(url.parse(request.url).pathname);
//     response.writeHeader(200, {"Content-Type": "text/plain;charset=utf-8"});
//     response.write("hello");
//     response.end();
// }).listen(8888);