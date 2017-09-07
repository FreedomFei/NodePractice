'use strict'

var fs = require('fs'),
    http = require('http');

fs.readFile("test/index.js", function (error, data) {
    if (error)
        return console.log("error:" + error);

    console.log("data:" + data);
});


var buffer1 = new Buffer('ABCDEF');

//copy a buffer
var buffer2 = new Buffer(2);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

console.log("node server start");


