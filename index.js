const electron = require('electron');
var express = require('express');

//Electron Things
const elApp = electron.app;
const BrowserWindow = electron.BrowserWindow;
//Express Things
const xprsApp = express();
xprsApp.use(express.static(__dirname));

xprsApp.use('/', express.static(__dirname + '/web_resources'));

const path = require('path');
const url = require('url');

let mainWindow;

var server = xprsApp.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'resources/select.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  mainWindow.loadURL('http://localhost:3000/select.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

elApp.on('ready', createWindow);

elApp.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    elApp.quit();
  }
});
