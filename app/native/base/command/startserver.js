var topolr = require("topolr-util");
var server=require("./../server");

module.exports = {
    command: "startserver",
    trigger: function (data, done) {
        server.startserver().then(function (a) {
            done(a);
        });
    }
};