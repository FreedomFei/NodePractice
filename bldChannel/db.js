'use strict'

var mysql = require('mysql'),
    template = require('./template.js');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'maizi_mobile',
    user: 'root',
    password: 'rootfei',
    charsetNumber: 'UTF8',
    connectionLimit: 10,
});

connection.connect((error) => {
    if (error) {
        throw error;
    }
});

var sqlQueryChannelAll = 'SELECT\n' +
    '\tc.channel_id,c.app_name,c.app_market_name,c.channel_number,p.platform_name\n' +
    'FROM\n' +
    '\tbld_channel c\n' +
    'LEFT JOIN\n' +
    '\tstatistics_platform p on c.p_id=p.platform_id';
// var sqlAddChannel = 'INSERT INTO bld_channel VALUES(null,\'名校贷白领版\',\'应用宝\',\'yyb1_1234\',1);';
exports.query = (callback) => {
    connection.query(sqlQueryChannelAll, (error, results, fields) => {
        if (error) {
            throw error;
        }

        return callback({results});
    });
};

exports.addChannel = (channelInfo, callback) => {
    var sqlAddChannel = `INSERT INTO bld_channel VALUES(null,'${channelInfo.app_name}','${channelInfo.app_market_name}','${channelInfo.channel_number}','${channelInfo.p_id}');`;
    console.log(sqlAddChannel);
    connection.query(sqlAddChannel, (error, results, fields) => {
        if (error) {
            throw error;
        } else if (results.affectedRows > 0) {
            return callback(template.responseSuccess);
        } else {
            console.log('处理结果:' + results.affectedRows);
            return callback(template.responseFail);
        }
    });
};

exports.deleteChannelByIds = (channelIds, callback) => {
    var sqlDeleteChannel = `DELETE FROM bld_channel WHERE channel_id IN (${channelIds});`;
    console.log(sqlDeleteChannel);
    connection.query(sqlDeleteChannel, (error, results, fields) => {
        if (error) {
            throw error;
        } else if (results.affectedRows > 0) {
            return callback(template.responseSuccess);
        } else {
            console.log('处理结果:' + results.affectedRows);
            return callback(template.responseFail);
        }
    });
};

// connection.end();
