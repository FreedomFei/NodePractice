var http = require('http'),
    url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(handle, pathname, request, response);
    }

    http.createServer(onRequest).listen(3002);
    console.log('3002 port started');
}

exports.start = start;
