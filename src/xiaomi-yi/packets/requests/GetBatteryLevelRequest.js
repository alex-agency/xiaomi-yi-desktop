'use strict';

var AbstractRequest = require('../AbstractRequest');

/**
 * Packet : Get battery level
 * Description : Sent by the client to retrieve the battery level
 * Opcode : 13
 */
var GetBatteryLevelRequest = function() {
    AbstractRequest.call(this, 13);
};

GetBatteryLevelRequest.prototype = Object.create(AbstractRequest.prototype);
GetBatteryLevelRequest.prototype.constructor = GetBatteryLevelRequest;

module.exports = GetBatteryLevelRequest;
