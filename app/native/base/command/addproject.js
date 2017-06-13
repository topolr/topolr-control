var topolr = require("topolr-util");
var server=require("./../server");

module.exports = {
    command: "addproject",
    trigger: function (data, done) {
        console.log(data)
        server.createProject(data.name,data.path,"").then(function (a) {
            done(a);
        });
    }
};