var mongoskin = require('mongoskin'),
    config = require('./config.json');

module.exports = (function () {

    var host = config.host,
        port = config.port,
        dbName = config.dbname,
        userName = config.username,
        password = config.password,
        dburl = 'mongodb://' + userName + ':' + password + '@' + host + ':' + port + '/' + dbName;

    var option = {
        native_parser: true
    };
    return mongoskin.db(dburl, option);
})();