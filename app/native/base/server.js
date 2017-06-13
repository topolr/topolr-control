var topolr = require("topolr-util");
var server = {
    basePath: require("path").resolve(__dirname, "./../../../node_modules/topolr-server").replace(/\\/g, "/") + "/",
    listProjects: function () {
        var path = this.basePath + "webapps", ths = this, queue = topolr.queue(), ps = topolr.promise(), ls = [];
        queue.complete(function () {
            ps.resolve(ls);
        });
        topolr.file(path).subscan(function (pa, isfile) {
            if (!isfile) {
                var n = pa.substring(path.length + 1, pa.length - 1);
                ls.push({
                    name: n,
                    path: pa.substring(0, pa.length - 1),
                    isout: false
                });
            } else {
                if (pa.indexOf(".json") !== -1) {
                    queue.add(function (a, b) {
                        var tss = this;
                        topolr.file(b).read().then(function (data) {
                            var n = JSON.parse(data);
                            ls.push({
                                name: n.name,
                                path: n.path.substring(0, n.path.length - 1),
                                isout: true
                            });
                            tss.next(n.name);
                        });
                    }, function () {
                        this.next();
                    }, pa);
                }
            }
        });
        queue.run();
        return ps;
    },
    removeProject: function (projectName) {
        var path = this.basePath + "webapps" + "/" + projectName, ps = topolr.promise();
        if (projectName !== "ROOT") {
            if (topolr.file(path + ".json").isExists()) {
                topolr.file(path + ".json").remove();
                ps.resolve();
            } else {
                if (topolr.file(path).isExists()) {
                    topolr.file(path).remove();
                    ps.resolve();
                } else {
                    ps.resolve();
                }
            }
        } else {
            if (topolr.file(path + ".json").isExists()) {
                topolr.file(path + ".json").remove();
            } else {
                util.logger.log("actioncmd", "Default ROOT can not remove");
            }
            ps.resolve();
        }
        return ps;
    },
    createProject: function (name, path, remotePath) {
        path = path.replace(/\\/g, "/");
        if (path[path.length - 1] !== "/") {
            path = path + "/";
        }
        var p = this.basePath, q = p + "webapps/" + name + ".json";
        return topolr.file(q).write(JSON.stringify({
            name: name,
            path: path,
            remotePath: remotePath || ""
        }, null, 4));
    },
    startserver:function () {
        var ps=topolr.promise();
        var options = {
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 200 * 1024,
            killSignal: 'SIGTERM',
            setsid: false,
            cwd: require("path").resolve(__dirname, "./../../../node_modules/topolr-server").replace(/\\/g, "/") + "/bin",
            env: null
        };
        var cp = require('child_process');
        cp.exec('node cli start', options, function (e, stdout, stderr) {
            console.log("[server] install the project end.",stdout);
            ps.resolve();
        });
        return ps;
    },
    stopserver:function () {
        var ps=topolr.promise();
        var options = {
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 200 * 1024,
            killSignal: 'SIGTERM',
            setsid: false,
            cwd: require("path").resolve(__dirname, "./../../../node_modules/topolr-server").replace(/\\/g, "/") + "/bin",
            env: null
        };
        var cp = require('child_process');
        cp.exec('node cli stop', options, function (e, stdout, stderr) {
            console.log("[server] install the project end.",stdout);
            ps.resolve();
        });
        return ps;
    }
};

module.exports = server;