var db = require('./mongo.js'),
    status = require('./status'),
    mongoskin = require('mongoskin');

var CRUD = function (collection) {
    this.collection = collection;
    db.bind(this.collection);
};

CRUD.prototype = {

    create: function (model, callback) {
        db[this.collection].save(model, function (err, item) {
            if (err) {
                return callback(status.fail);
            }
            item.status = status.success.status;
            item.message = status.success.message;
            return callback(item);
        });
    },
    read: function (query, callback) {
        db["Student"].find(query).toArray(function (err, items) {
            if (err) {
                return callback(status.fail);
            }
            var obj = {
                status: status.success.status,
                message: status.success.message,
                items: items
            };
            return callback(obj);
        });
    },
    update: function (query, updateModel, callback) {
        var set = {set: updateModel};
        db[this.collection].update(query, set, function (err) {
            if (err) {
                return callback(status.fail);
            } else {
                return callback(status.success);
            }
        });
    },
    deleteData: function (query, callback) {
        db[this.collection].remove(query, function (err) {
            if (err) {
                return callback(status.fail);
            }
            return callback(status.success);
        });
    }
};

module.exports = CRUD;