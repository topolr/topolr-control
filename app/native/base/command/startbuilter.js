var topolr = require("topolr-util");
var builter=require("./../builter");

module.exports = {
    command: "startbuilter",
    trigger: function (data, done) {
        builter.start(data.path).then(function (a) {
            done(a);
        });
    }
};