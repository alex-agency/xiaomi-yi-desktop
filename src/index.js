'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

// Window object global reference
let mainWindow = null;

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
