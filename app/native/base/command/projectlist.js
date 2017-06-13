var topolr = require("topolr-util");
var server=require("./../server");

module.exports = {
    command: "projectlist",
    trigger: function (data, done) {
        server.listProjects().then(function (a) {
            done(a);
        });
    }
};