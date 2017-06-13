require("./app/native/base/commander");
var electron = require("electron");
var app = electron.app;
var browserWindow = electron.BrowserWindow;
var ipc = require('electron').ipcMain;
var config=require("./package");

var win = null;
var createWindow = function () {
    win = new browserWindow({
        width: 400,
        height: 300,
        title:config.name,
        autoHideMenuBar:true,
        webPreferences:{
            webSecurity:false
        }
    });
    win.loadURL("file://" + __dirname + "/index.html");
    win.webContents.openDevTools();
    win.on('closed', function(){
        win = null;
    });
};
app.on("ready", createWindow);
app.on("active", function () {
    if (win === null) {
        createWindow();
    }
});
app.on('window-all-closed', function (e) {
    app.quit();
});