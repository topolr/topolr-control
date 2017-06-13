var topolr = require("topolr-util");
var server=require("./../server");

module.exports = {
    command: "removeproject",
    trigger: function (data, done) {
        server.removeProject(data.name);
        done();
    }
};