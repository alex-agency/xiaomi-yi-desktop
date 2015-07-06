'use strict';

// Packets
var StartSessionRequest = require('./packets/requests/StartSessionRequest');

var CameraCommands = function() {
};

CameraCommands.prototype.startSession = function(connection) {
    connection.send(new StartSessionRequest());
};

module.exports = new CameraCommands();
