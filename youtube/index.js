var request = require('superagent'),
    opn = require('opn');
require('superagent-proxy')(request);
// alert(yt.getConfig('TTS_URL'))//youtube函数
var cheerio = require('cheerio');

var proxy = 'http://127.0.0.1:50617';//设置代理IP地址

//请求头信息
var header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;0.6',
    'Cookie': 'WKcs6.resume=; _ga=GA1.2.1653214693.1476773935; _gid=GA1.2.943573022.1500212436; YSC=_X6aKoK1jMc; s_gl=1d69aac621b2f9c0a25dade722d6e24bcwIAAABVUw==; VISITOR_INFO1_LIVE=T3BczuPUIQo; PREF=hl=zh-CN&cvdm=grid&gl=US&f1=50000000&al=zh-CN&f6=1&f5=30; SID=7gR6XOImfW5PbJLOrScScD4DXf8cHCkWCkxSUFy9CbhnaFaPLBCVCElv97n_mjWgkPC_ow.; HSID=A0_bKgPkAZLJUfnTj; SSID=ASjQTON7p_q4UNgit; APISID=ZIVPX9a3vUKRa28E/A0dykxLiVJ4xDIUS_; SAPISID=t6dcqHC9pjGsE7Bi/ATm5wgRC27rqUQr5B; CONSENT=YES+CN.zh-CN+20160904-14-0; LOGIN_INFO=APUNbegwRQIhAPnMZ-qYHOSAKq0s9ltEQIUvnWNj9CHQ8J5s2JtZK15TAiBLzfS4HEUh-mWGo2Qo6XOruItGRdpPZ2v3cXLqYY7xtA:QUZKNV9BajdRR2VZQ2QyRlVDdXh3VDdKZ1AzMlFqRmg3aTBfR2pxWXFHWXlXYm1BaVVnQWk4UzZfWmZGSGcxRkNuTDBFYTk2a2tKLUEtNmtNaWZKM3hTMWNTZkgyOVlvTF9DNENwTG5XTlJudEVHQzVIeGxMbTFTdkl6YS02QlBmMmM0NVgteWI3QVNIa3c5c2ZkV1NSa3AzbWhwOHBtbzVrVTVSbTBqaWpIZ0dWNTd4UjJRSllr',
    'Upgrade-insecure-requests': '1',
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36',
    'X-Chrome-Uma-Enabled': '1',
    'X-Client-Data': 'CJa2yQEIorbJAQjBtskBCKmdygE=',
    'Connection': 'keep-alive'
};

// translationLanguages语言
function downloadSubtitle(url, callback) {
    request.get(url)//需要获取的网址
        .set('header', header)
        .proxy(proxy)
        .end(onresponse);

    function onresponse(err, res) {
        res.setEncoding('utf-8'); //防止中文乱码
        if (!err) {
            console.log('status:' + res.status);//打印状态码
            let $ = cheerio.load(res.text);

            // let temp =$('html').find('script').toArray();
            let temp = $('script').toArray();
            let html = cheerio.load(temp[19]).html().replace(/(\n)+/g, '\n');
            html = html.substring(html.indexOf('({'), html.indexOf('})') + 2).trim();
            html = decodeURIComponent(html);
            console.log('script:' + html);
            let obj = eval(html);
            console.log(obj.VIDEO_ID);
            let ttsurl = obj.TTS_URL;
            if (!ttsurl.includes('kind')) {
                ttsurl = ttsurl.concat('&kind=').concat('asr')
                    .concat('&lang=').concat('en');
            }
            if (!ttsurl.includes('tlang')) {
                // fmt	srv1
                // tlang	zh-Hans
                ttsurl = ttsurl.concat('&tlang=').concat('zh-Hans')
                    .concat('&fmt=').concat('srv1');
            }
            // if (!ttsurl.includes('fmt')) {
            //     ttsurl = ttsurl.concat('&fmt=').concat('srv3');
            // }
            opn(ttsurl);

            console.log(ttsurl);
            let split = ttsurl.split('&');
            split.forEach((item) => {
                console.log(item);
            })

            callback('success');
        } else {
            return callback(err);
        }
    }
}

exports.downloadSubtitle = downloadSubtitle

// downloadSubtitle('https://www.youtube.com/watch?v=eD0-FyZ7Dv8');

//
// function getVideoInfo(vid, callback) {
//     var vid = 'eD0-FyZ7Dv8';
//     this.videoInfo.videoID = vid;
//     var video_info_url = 'http://www.youtube.com/get_video_info?eurl=http://test.localhost.local/&sts=1586&video_id=' + vid;
//
//     var options = {
//         host: url.parse(video_info_url).host,
//         port: 80,
//         path: url.parse(video_info_url).path
//     };
//
//     var infos = '';
//     var self = this;
//
//     http.get(options, function (res) {
//         res.on('data', function (data) {
//             infos += data.toString();
//         }).on('end', function () {
//             self[callback](infos);
//         });
//     });
//     request.get(video_info_url)
//         .set('header', header)
//         .proxy(proxy)
//         .end((res) => {
//             res.on('data', function (data) {
//                 infos += data.toString();
//             }).on('end', function () {
//                 self[callback](infos);
//             });
//         });
// }


/*
我的
https://www.youtube.com/api/timedtext?caps=asr
&sparams=asr_langs,caps,v,xorp,expire
&signature=90817F4958890A21666A8FEDE042C642BA96A013.A849336BCFE872912E82C4E0BE24782B5FD49326
&key=yttt1
&v=eD0-FyZ7Dv8
&xorp=True
&expire=1516563469
&asr_langs=es,it,fr,pt,nl,ru,ko,de,en,ja
&hl=ja_JP
&kind=asr
&lang=en
&tlang=zh-Hans
&fmt=srv1
*/


/*
默认字幕
https://www.youtube.com/api/timedtext?xorp=True
&signature=CFBD9F31D9AB68F5EC2904DF79E861BDF6FAD496.BB45A6DB20584882B00D71F6C944AF6E05B9863F
&key=yttt1
&v=eD0-FyZ7Dv8
&asr_langs=ja,en,fr,ko,de,it,nl,pt,ru,es
&caps=asr
&hl=zh_CN
&sparams=asr_langs,caps,v,xorp,expire
&expire=1516558439
&kind=asr
&lang=en
*/


/*
 * nodeYouTubeDownloader v0.2
 * https://github.com/kejjang/node-youtube-downloader
 *
 * Copyright (C) 2013 Kej Jang <kejjang@gmail.com>
 * Released under the WTFPL
 * http://www.wtfpl.net/
 *
 * Date: 2013-09-26
 */
var fs = require('fs'),
    url = require('url'),
    http = require('http'),
    util = require('util'),
    querystring = require('querystring');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

var nodeYouTubeDownloader = {

    videoInfo: {
        videoID: '',
        title: '',
        urls: [],
        currentDownloadIndex: -1
    },

    fmt_str: {
        0: {desc: 'FLV, 320 x 240, Mono 22KHz MP3', ext: 'flv'}, // delete ?
        5: {desc: 'FLV, 400 x 240, Mono 44KHz MP3', ext: 'flv'},
        6: {desc: 'FLV, 480 x 360, Mono 44KHz MP3', ext: 'flv'}, // delete ?
        34: {desc: 'FLV, 640 x 360, Stereo 44KHz AAC', ext: 'flv'},
        35: {desc: 'FLV, 854 x 480, Stereo 44KHz AAC', ext: 'flv'},
        13: {desc: '3GP, 176 x 144, Stereo 8KHz', ext: '3gp'}, // delete ?
        17: {desc: '3GP, 176 x 144, Stereo 44KHz AAC', ext: '3gp'},
        36: {desc: '3GP, 320 x 240, Stereo 44KHz AAC', ext: '3gp'},
        18: {desc: 'MP4, 640 x 360, Stereo 44KHz AAC', ext: 'mp4'},
        22: {desc: 'MP4, 1280 x 720, Stereo 44KHz AAC', ext: 'mp4'},
        37: {desc: 'MP4, 1920 x 1080, Stereo 44KHz AAC', ext: 'mp4'},
        38: {desc: 'MP4, 4096 x 3072, Stereo 44KHz AAC', ext: 'mp4'},
        82: {desc: 'MP4, 640 x 360, Stereo 44KHz AAC', ext: 'mp4'},
        83: {desc: 'MP4, 854 x 240, Stereo 44KHz AAC', ext: 'mp4'},
        84: {desc: 'MP4, 1280 x 720, Stereo 44KHz AAC', ext: 'mp4'},
        85: {desc: 'MP4, 1920 x 520, Stereo 44KHz AAC', ext: 'mp4'},
        43: {desc: 'WebM, 640 x 360, Stereo 44KHz Vorbis', ext: 'webm'},
        44: {desc: 'WebM, 854 x 480, Stereo 44KHz Vorbis', ext: 'webm'},
        45: {desc: 'WebM, 1280 x 720, Stereo 44KHz Vorbis', ext: 'webm'},
        46: {desc: 'WebM, 1920 x 540, Stereo 44KHz Vorbis', ext: 'webm'},
        100: {desc: 'WebM, 640 x 360, Stereo 44KHz Vorbis', ext: 'webm'},
        101: {desc: 'WebM, 854 x 480, Stereo 44KHz Vorbis', ext: 'webm'},
        102: {desc: 'WebM, 1280 x 720, Stereo 44KHz Vorbis', ext: 'webm'},
        133: {desc: 'MP4, 426 x 240, Stereo 44KHz AAC', ext: 'mp4'},
        134: {desc: 'MP4, 640 x 360, Stereo 44KHz AAC', ext: 'mp4'},
        135: {desc: 'MP4, 854 x 480, Stereo 44KHz AAC', ext: 'mp4'},
        136: {desc: 'MP4, 1280 x 720, Stereo 44KHz AAC', ext: 'mp4'},
        137: {desc: 'MP4, 1920 x 1080, Stereo 44KHz AAC', ext: 'mp4'},
        139: {desc: 'M4A, 48 kbit/s audio only', ext: 'm4a'},
        140: {desc: 'M4A, 128 kbit/s audio only', ext: 'm4a'},
        141: {desc: 'M4A, 256 kbit/s audio only', ext: 'm4a'},
        160: {desc: 'MP4, 256 x 144, Stereo 44KHz AAC', ext: 'mp4'},
        264: {desc: 'MP4, 1920 x 1080, Stereo 44KHz AAC', ext: 'mp4'}  // not sure
    },

    start: function () {
        this.videoInfo = {videoID: '', title: '', urls: [], currentDownloadIndex: -1};

        // process.stdout.write("paste youtube url here:\n> ");

        var self = this;
        // process.stdin.once('data', function(chunk){
        //     var youtube_url = chunk.toString().trim();
        var checkResult = self.validYouTubeUrl(
            'https://www.youtube.com/watch?v=MFBMNQ1HHpc'
        );

        if (checkResult.valid) {
            self.getVideoInfo(checkResult.vid, 'parseVideoInfo');
            // self.getVideoInfo_alternative(checkResult.vid, 'parseVideoInfo_alternative');
        } else {
            self.wrongUrl();
        }
        // });
    },

    validYouTubeUrl: function (youtube_url) {
        var valid = false;
        var vid = '';
        var pattern1 = /^https?:\/\/(.*?)?youtube.com/;
        var pattern2 = /^https?:\/\/youtu.be/;

        if (pattern1.test(youtube_url)) {
            if (youtube_url.indexOf('/v/') == -1) {
                var ua = url.parse(youtube_url, true);
                if (ua.query.v != null) {
                    vid = ua.query.v;
                    valid = true;
                } else if (ua.query.video_id != null) {
                    vid = ua.query.video_id;
                    valid = true;
                }
            } else {
                var url_parts = url.parse(youtube_url).path.split('/v/');
                vid = url_parts[1];
                valid = true;
            }
        } else if (pattern2.test(youtube_url)) {
            vid = url.parse(youtube_url).pathname.substr(1);
            valid = true;
        }

        return {valid: valid, vid: vid};
    },

    wrongUrl: function () {
        process.stdout.write("sorry, wrong url... ");
        this.askRestart();
    },

    getVideoInfo: function (vid, callback) {
        this.videoInfo.videoID = vid;
        var video_info_url = 'http://www.youtube.com/get_video_info?eurl=http://test.localhost.local/&sts=1586&video_id=' + vid;

        var infos = '';
        var self = this;
        request.get(video_info_url)
            .set('header', header)
            .proxy(proxy)
            .end((err, res) => {
                // console.log(res.body);
                infos += res.text;
                self[callback](infos);
            });
    },

    getVideoInfo_alternative: function (vid, callback) {
        this.videoInfo.videoID = vid;
        var video_info_url = 'http://www.youtube.com/watch?v=' + vid;

        var options = {
            host: url.parse(video_info_url).host,
            port: 80,
            path: url.parse(video_info_url).path
        };

        var infos = '';
        var self = this;

        // http.get(options, function (res) {
        //     res.on('data', function (data) {
        //         infos += data.toString();
        //     }).on('end', function () {
        //         // console.log(video_info_url);
        //         // console.log(options);
        //         // console.log(infos);
        //         self[callback](infos);
        //     });
        // });

        request.get(video_info_url)
            .set('header', header)
            .proxy(proxy)
            .end((err, res) => {
                infos += res.text;
                self[callback](infos);
            });
    },

    parseVideoInfo: function (infos) {
        var ignoreFormats = ['43', '44', '45', '46', '100', '101', '102', '264'];

        var queries = querystring.parse(infos);

        this.videoInfo.title = queries.title;
        var fmt_map = '';

        try {
            //fmt_map = queries.url_encoded_fmt_stream_map.split(',');
            fmt_map = queries.adaptive_fmts.split(',');
        } catch (err) {
        }

        if (fmt_map == '') {
            this.getVideoInfo_alternative(this.videoInfo.videoID, 'parseVideoInfo_alternative');
        } else {
            process.stdout.write("\n" + this.videoInfo.title + "\n");

            var dlCount = 1;
            for (var i in fmt_map) {
                fmt_map[i] = querystring.parse(fmt_map[i]);

                if (this.fmt_str[fmt_map[i].itag] == undefined) {
                    this.fmt_str[fmt_map[i].itag] = {desc: '(' + fmt_map[i].type + ')', ext: ''};
                }

                if (ignoreFormats.indexOf(fmt_map[i].itag) == -1) {
                    this.videoInfo.urls.push({
                        itag: fmt_map[i].itag,
                        url: fmt_map[i].url + "&signature=" + this.getSignature(fmt_map[i])
                    });
                    process.stdout.write('[' + dlCount++ + '] ' + this.fmt_str[fmt_map[i].itag].desc + "\n");
                }
            }

            this.askDownload();
        }
    },

    parseVideoInfo_alternative: function (infos) {
        var ignoreFormats = ['43', '44', '45', '46', '100', '101', '102', '264'];

        var regexp_title = new RegExp("<meta\\sname=\"title\"\\scontent=\"(.*?)\">", "ig");
        var result_title = regexp_title.exec(infos);

        var url_encoded_fmt_stream_map = '';
        //var regexp_fmt_map = new RegExp("\"url_encoded_fmt_stream_map\":\\s\"(.*?)\"", "ig");
        var regexp_fmt_map = new RegExp("\"adaptive_fmts\":\\s\"(.*?)\"", "ig");
        var result_fmt_map = regexp_fmt_map.exec(infos);
        var url_encoded_fmt_stream_map = '';

        try {
            this.videoInfo.title = result_title[1];
            // have a html entities issue, will fix later

            url_encoded_fmt_stream_map = result_fmt_map[1];
        } catch (err) {
        }

        // console.log(url_encoded_fmt_stream_map);

        var fmt_map = '';

        try {
            fmt_map = url_encoded_fmt_stream_map.split(',');
        } catch (err) {
        }

        if (fmt_map == '') {
            console.log("xx")
            // process.stdout.write("oh oh... something's wrong... ");
            // this.askRestart();
            var self = this;
            self.start();
        } else {
            process.stdout.write("\n" + this.videoInfo.title + "\n");

            var dlCount = 1;
            for (var i in fmt_map) {
                fmt_map[i] = querystring.parse(fmt_map[i].replace(/\\u0026/g, '&'));

                if (this.fmt_str[fmt_map[i].itag] == undefined) {
                    this.fmt_str[fmt_map[i].itag] = {desc: '(' + fmt_map[i].type + ')', ext: ''};
                }

                if (ignoreFormats.indexOf(fmt_map[i].itag) == -1) {
                    this.videoInfo.urls.push({
                        itag: fmt_map[i].itag,
                        url: fmt_map[i].url + "&signature=" + this.getSignature(fmt_map[i])
                    });
                    process.stdout.write('[' + dlCount++ + '] ' + this.fmt_str[fmt_map[i].itag].desc + "\n");
                }
            }

            this.askDownload();
        }
    },

    getSignature: function (fmt) {
        if (fmt.sig != null) {
            return fmt.sig;
        } else if (fmt.s != null) {
            return this.alternativeSignatureHandler(fmt.s);
        }

        return '';
    },

    alternativeSignatureHandler: function (s) {
        var sArray = s.split("");
        var tmpA, tmpB;

        tmpA = sArray[0];
        tmpB = sArray[52];

        sArray[0] = tmpB;
        sArray[52] = tmpA;

        tmpA = sArray[83];
        tmpB = sArray[62];

        sArray[83] = tmpB;
        sArray[62] = tmpA;

        sArray = sArray.slice(3);
        sArray = sArray.reverse();
        sArray = sArray.slice(3);

        return sArray.join("");
    },

    downloadFile: function (fileIndex) {
        this.videoInfo.currentDownloadIndex = fileIndex;
        var file_url = this.videoInfo.urls[fileIndex].url;
        console.log('download url:' + file_url);
        // this.downloadFileRealUrl(file_url);
    },

    downloadFileRealUrl: function (file_url) {
        var options = {
            host: url.parse(file_url).host,
            port: 80,
            path: url.parse(file_url).path
        };

        var self = this;

        http.get(options, function (res) {
            if ([301, 302, 303, 307].indexOf(res.statusCode) > -1 && res.headers.location) {
                self.downloadFileRealUrl(res.headers.location);
            } else {
                process.stdout.write("file size: " + (Math.round(parseInt(res.headers['content-length']) * 100.0 / (1024 * 1024)) / 100) + "MB.\n");

                var file_name = self.videoInfo.videoID + '.' + self.fmt_str[self.videoInfo.urls[self.videoInfo.currentDownloadIndex].itag].ext;
                var file = fs.createWriteStream(file_name);

                process.stdout.write("video is downloading and save as " + file_name + ", please wait...\n");

                res.on('data', function (data) {
                    file.write(data);
                }).on('end', function () {
                    file.end();
                    process.stdout.write("video download complete.\n");
                    setTimeout(function () {
                        self.askRestart();
                    }, 800);
                });
            }
        });

    },

    askDownload: function () {
        var self = this;
        // process.stdout.write("\nwhich one do you want to download? or enter 0 to exit.\n> ");
        // process.stdin.once('data', function (chunk) {
        //     var ans = -1;
        //     try {
        //         ans = parseInt(chunk.toString().trim());
        //     } catch (err) {
        //     }
        //
        //     if (ans <= -1 || ans > self.videoInfo.urls.length) {
        //         self.askDownload();
        //     } else if (ans == 0) {
        //         self.askRestart();
        //     } else {
        //         self.downloadFile(ans - 1);
        //     }
        // });
        self.downloadFile(9 - 1);
    },

    askRestart: function () {
        var self = this;
        process.stdout.write("wanna start over again? (Y/n)\n> ");
        process.stdin.once('data', function (chunk) {
            var ans = chunk.toString().trim().toLowerCase().substr(0, 1);
            if (ans == 'y' || ans == '') {
                self.start();
            } else if (ans == 'n') {
                process.stdout.write("enjoy your video, bye bye.\n");
                process.exit();
            } else {
                self.askRestart();
            }
        });
    }
};

nodeYouTubeDownloader.start();




