'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Start session
 * Description : Sent by the camera after a "Start session request"
 * Opcode : 257
 */
var StartSessionResponse = function() {
    AbstractResponse.call(this);
};

StartSessionResponse.prototype = Object.create(AbstractResponse.prototype);
StartSessionResponse.prototype.constructor = StartSessionResponse;

StartSessionResponse.prototype.matches = function() {
    return (this._data.msg_id == 257 && this._data.param);
};

StartSessionResponse.prototype.process = function() {
    var token = this._data.param;
    console.log('StartSessionResponse: Token update (' + token + ')');

    // Send new token to the CameraConnection
    var CameraConnection = require('../../CameraConnection');
    CameraConnection.setToken(token);

    // Send a GetBatteryLevel request
    var CameraCommands = require('../../CameraCommands');
    CameraCommands.getBatteryLevel(CameraConnection);

    // Send GetSettings request
    CameraCommands.getSettings(CameraConnection);
};

module.exports = StartSessionResponse;
