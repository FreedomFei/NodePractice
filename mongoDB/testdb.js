var crud = require("./crud");

crud("Student");

crud.prototype.read({"name": "jack"}, function (obj) {
    console.log(obj);
})
