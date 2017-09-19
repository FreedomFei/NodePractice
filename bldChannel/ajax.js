"use strict";

function queryChannel() {
    let xmlHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
    } else {
        alert('请使用Chrome浏览器')
    }

    // xmlHttpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttpRequest.open('GET', 'http://localhost:3001/queryChannel?t=' + Math.random(), true);
    xmlHttpRequest.send()
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            let json = JSON.parse(xmlHttpRequest.responseText);
            if (json === undefined || json === null) {
                console.log('json数据错误');
                return;
            }
            let resultHtml = '';
            json.results.forEach(function (result) {
                //class name导出的时候使用到
                resultHtml = resultHtml.concat('<tr>\n' +
                    '<td>' + result.channel_id + '</td>\n' +
                    '<td>' + result.app_name + '</td>\n' +
                    '<td>' + result.app_market_name + '</td>\n' +
                    '<td class="channel_number">' + result.channel_number + '</td>\n' +
                    '<td class="platform_name">' + result.platform_name + '</td>\n' +
                    '<td>' + '<input name="input_elect" type="checkbox" value="' + result.channel_id + '"/>' + '</td>\n' +
                    '</tr>'
                );
            });
            document.getElementById('tbody_row_data').innerHTML = resultHtml;
        }
    }
}

function addChannel() {
    jQuery(document).ready(function () {
        $.ajax({
            url: 'http://localhost:3001/addChannel',
            type: 'POST',
            dataType: 'json',
            data: $('form#form_add').serialize(),
            success: function (data) {
                alert(data.message);
                queryChannel();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
}

function deleteChannel() {
    var channels = document.getElementsByName('input_elect');
    var channelLength = channels.length;
    var electChannels = new Array();
    for (var i = 0; i < channelLength; i++) {
        if (channels[i].checked) {
            electChannels.push(channels[i].value);
        }
    }

    jQuery(document).ready(function () {
        $.ajax({
            url: 'http://localhost:3001/deleteChannelByIds',
            type: 'POST',
            dataType: 'json',
            data: {ids: `${electChannels}`},
            success: function (data) {
                alert(data.message);
                queryChannel();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
}
