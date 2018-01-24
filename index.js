const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var http = require('http');

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width:1280, heigh: 800});

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/build/splash.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function(){
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('active', function(){
  if(mainWindow == null){
    createWindow();
  }
});
