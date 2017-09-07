var http = require("http"),
    url = require("url");

http.createServer(function (request, response) {
    console.log(url.parse(request.url).pathname);
    response.writeHeader(200, {"Content-Type": "text/plain;charset=utf-8"});
    response.write("hello");
    response.end();
}).listen(8888);