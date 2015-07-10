'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Settings update
 * Description : Sent by the camera after a "Get settings" request
 * Opcode : 3
 */
var GetSettingsResponse = function() {
    AbstractResponse.call(this);
};

GetSettingsResponse.prototype = Object.create(AbstractResponse.prototype);
GetSettingsResponse.prototype.constructor = GetSettingsResponse;

GetSettingsResponse.prototype.matches = function() {
    return (this._data.msg_id == 3 &&  this._data.param);
};

GetSettingsResponse.prototype.process = function() {
    var settings = this._data.param;

    for (var i=0; i<settings.length; i++) {
        for (var key in settings[i]) {
            var value = settings[i][key];
            console.log('GetSettingsResponse: '+key+' = '+value);
        }
    }

    // TODO Call SettingsStore
};

module.exports = GetSettingsResponse;
