'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');
var nconf = require('nconf');

// Window object global reference
var mainWindow = null;

// Load configuration
nconf.env();
nconf.argv();
nconf.file({ file: 'config/config.json' });
nconf.defaults({
    'ip': '192.168.42.1',
    'port': 7878
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// Called when electron is ready
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        'width': 1024,
        'height': 768,
        'resizable': false,
        'center': true
    });

    if (process.env.NODE_ENV === 'development') {
        // Open the devtools.
        mainWindow.openDevTools();
    }

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
