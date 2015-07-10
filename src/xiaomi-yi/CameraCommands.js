'use strict';

var CameraCommands = function() {
};

CameraCommands.prototype.getBatteryLevel = function(connection) {
    connection.send(new (require('./packets/requests/GetBatteryLevelRequest')));
};

CameraCommands.prototype.getSettings = function(connection) {
    connection.send(new (require('./packets/requests/GetSettingsRequest')));
};

CameraCommands.prototype.getSpace = function(connection, type) {
    connection.send(new (require('./packets/requests/GetSpaceRequest')));
};

CameraCommands.prototype.startSession = function(connection) {
    connection.send(new (require('./packets/requests/StartSessionRequest')));
};

module.exports = new CameraCommands();
