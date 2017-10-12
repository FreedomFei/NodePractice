'use strict'

let os = require('os'),
    exec = require('child_process').exec,
    opn = require('opn');

//输出url和port并在brower打开
exports.openUri = function (port) {
    var network = os.networkInterfaces()
    for (var net in network) {
        network[net].forEach(function (details) {
            if (details.family === 'IPv4' && !details.internal) {
                var url = 'http://' + details.address + ':' + port;
                console.log(url);
                //浏览器打开url方式1，和方式2方法相同
                opn(url);
                //浏览器打开url方式2
                // switch (process.platform) {
                //     case "darwin":
                //         exec('open ' + url);
                //         break;
                //     case "win32":
                //         exec('start ' + url);
                //         break;
                //     default:
                //         exec('xdg-open', [url]);
                // }
            }
        });
    }
}
