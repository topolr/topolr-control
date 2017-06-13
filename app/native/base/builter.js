var topolr = require("topolr-util");
var builter={
    start:function (path) {
        console.log("==>",path);
        var ps=topolr.promise();
        var options = {
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 200 * 1024,
            killSignal: 'SIGTERM',
            setsid: false,
            cwd: path,
            env: null
        };
        var cp = require('child_process');
        cp.exec('topolr-builter develop', options, function (e, stdout, stderr) {
            console.log(stderr)
            console.log(stdout);
            ps.resolve();
        });
        console.log(cp)
        return ps;
    }
};

module.exports=builter;