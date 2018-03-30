'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let index = require('./index');
let serverInfo = require('../bldChannel/serverInfo');

let app = express();
app.use(express.static('youtube'));
var urlEncoded = bodyParser.urlencoded({extended: false});

let server = app.listen(() => {
    //listen没有指定端口号会自动分配端口号
    // serverinfo.openUri(server.address().port);
    server.address().port = 3002;
    serverInfo.openUri(server.address().port);
});

app.post('/download', urlEncoded, (req, res) => {
    console.log(req.body);
    index.downloadSubtitle(req.body.youtube_url, (err) => {
        console.log(err);
        if (err=='success'){
            // res.send("xxx").end();
            res.end();
        }
    })
})

