'use strict'

var mysql = require('mysql'),
    util = require('util');

var connection = mysql.createConnection({
    host: '172.16.0.101',
    user: 'dev',
    password: 'beX5kFn4',
    database: 'db_nono'
});
connection.connect(function (error) {
    if (error)
        throw error;
});

//接收terminal输入
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    mobile = process.stdin.read();
    if (typeof mobile === 'string') {
        mobile = mobile.slice(0, -1);
        console.log('search:' + mobile);
    }
    if (mobile !== null && mobile !== '') {
        mobile = "'" + mobile + "'";
        console.log('search:' + mobile);
        queryUserSql = `SELECT mobile_num,password,user_name FROM user_info WHERE user_name = ${mobile} OR mobile_num = ${mobile} LIMIT 5;`;
        queryByMobile();
    }
    // else {
    //     console.log(`mobile is ${mobile}`);
    // }
});

var mobile;
// var queryUserSql = util.format('SELECT mobile_num,password FROM user_info WHERE mobile_num = \'%s\' LIMIT 5;', mobile);
var queryUserSql;

function queryByMobile() {
    connection.query(queryUserSql, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);

        connection.end((error) => {
            if (error)
                throw error;
            console.log('sql connection is closed');
        });
        process.stdin.end(() => {
            process.stdout.write('end');
        })
        // process.stdin.on('end', () => {
        //     process.stdout.write('end');
        // });
    });
}

console.log("输入查询的用户id或手机号")
