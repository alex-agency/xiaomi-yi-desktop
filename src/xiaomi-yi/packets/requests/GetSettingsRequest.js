'use strict';

var AbstractRequest = require('../AbstractRequest');

/**
 * Packet : Get settings
 * Description : Sent by the client to retrieve all the current settings
 * Opcode : 3
 */
var GetSettings = function() {
    AbstractRequest.call(this, 3);
};

GetSettings.prototype = Object.create(AbstractRequest.prototype);
GetSettings.prototype.constructor = GetSettings;

module.exports = GetSettings;
