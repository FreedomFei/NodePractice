function route(handle, pathname, request, response) {
    console.log('log/route_pathname:' + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        console.log('log/route_404:' + pathname);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 not found');
        response.end();
    }
}

exports.route = route;
