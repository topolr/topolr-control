var topolr = require("topolr-util");
var server=require("./../server");

module.exports = {
    command: "stopserver",
    trigger: function (data, done) {
        server.stopserver().then(function (a) {
            done(a);
        });
    }
};