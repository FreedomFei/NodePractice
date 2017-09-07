var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable'),
    url = require('url'),
    path = require("path"),
//mime = require('./mime').types;
    mime = require('mime');

var fileDir = "./uploadFile/upload/";

function start(requst, response) {
    console.log("log/start");

    //var body = '<html>' +
    //    '<head>' +
    //    '<meta http-equiv="Content-Type" content="text/html; ' +
    //    'charset=UTF-8" />' +
    //    '</head>' +
    //    '<body>' +
    //    '<form action="/upload" method="post">' +
    //    '<textarea name="text" rows="20" cols="60"></textarea>' +
    //    '<input type="submit" value="Submit text" />' +
    //    '</form>' +
    //    '</body>' +
    //    '</html>';

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(request, response) {
    console.log("log/upload");

    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        //console.log("log/upload_path:" + files.upload.path);
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            var fileName = files.upload.name;
            if (fileName !== null && fileName !== undefined && fileName !== "") {
                var type = files.upload.type.split("/")[0];

                var extname = path.extname(fileName);
                var basename = path.basename(fileName, extname);

                //new Date()是日期有问题,+new Date()是时间戳
                fs.renameSync(files.upload.path, fileDir + basename + +new Date() + extname);
                console.log("log/type:" + files.upload.type)
                show(request, response);
            } else {
                console.log("log/is null");
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(null + "\n");
                response.end();
            }
        }
    });
}

function show(request, response) {
    console.log('log/show');

    fs.readdir(fileDir, function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            var files = null;

            for (i = 0, len = file.length; i < len; ++i) {
                files += file[i] + "\n";
                console.log("log:" + file[i]);
            }

            //response.writeHead(200, {"Content-Type": "text/plain;charset=UTF-8"});
            //response.write("<a href='./uploadFile/upload/" + files + "'>" + files + "</a>");

            response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
            file.forEach(function (item) {
                response.write("<a href='/showFile?fileName=" + item + "'>" + item + "</a><br/>");
            })

            response.end();
        }
    });
}

function showFile(request, response) {
    console.log("log/showFile");
    var query = url.parse(request.url).query;
    var fileName = querystring.parse(query).fileName;

    fs.readFile(fileDir + fileName, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            //自己写的方法
            //var extname = path.extname(fileName);
            //extname = extname ? extname.slice(1) : 'unknown';
            //var contentType = mime[extname] || "text/plain";
            //使用框架
            var contentType = mime.lookup(fileDir + fileName);
            console.log(contentType);
            response.writeHead(200, {"Content-Type": contentType + ";charset=utf-8"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.showFile = showFile;
