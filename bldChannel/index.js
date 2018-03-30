'use strict';

let http = require('http'),
    express = require('express'),
    db = require('./db'),
    serverinfo = require('./serverinfo'),
    bodyParser = require('body-parser');

var urlEncoded = bodyParser.urlencoded({extended: false});
let app = express();
app.use(express.static('bldChannel'));//利用 Express 托管静态文件

console.log('server is started');

//方法一、原生
// var server = http.createServer();
// server.listen(0);
// server.on('listening', function() {
//     var port = server.address().port;
//     serverinfo.openUri(server.address().port);
// })

//方法二、express
let server = app.listen(() => {
    //listen没有指定端口号会自动分配端口号
    serverinfo.openUri(server.address().port);
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
