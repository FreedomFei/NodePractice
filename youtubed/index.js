var http = require('http'),
    https = require('https'),
    url = require('url'),
    cheerio = require('cheerio');//页面获取到的数据模块

var videoId = "PKqqN7cS-uc";
var urlVideoWatch = "https://www.youtube.com/watch?v=";
var urlVideoInfo = "http://youtube.com/get_video_info?video_id=";
var testUrl = "http://www.baidu.com";

var opt = {
    // host:'这里放代理服务器的ip或者域名',
    host: '127.0.0.1',
    // port:'这里放代理服务器的端口号',
    port: '51222',
    method: 'GET',//这里是发送的方法
    path: urlVideoInfo + videoId,     //这里是访问的路径
    headers: {
        //这里放期望发送出去的请求头
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

var request = https.get(opt, function (response) {
    console.log(request.path);

    console.log(response.statusCode);
    console.log(response.headers['location']);
})

request.setTimeout(3000, function () {
    console.log("timeout");
})


console.log("server start");

