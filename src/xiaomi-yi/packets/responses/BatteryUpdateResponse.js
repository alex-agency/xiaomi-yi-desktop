'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Battery update
 * Description : Sent by the camera after a battery level change
 * Opcode : 7
 */
var BatteryUpdateResponse = function() {
    AbstractResponse.call(this);
};

BatteryUpdateResponse.prototype = Object.create(AbstractResponse.prototype);
BatteryUpdateResponse.prototype.constructor = BatteryUpdateResponse;

BatteryUpdateResponse.prototype.matches = function() {
    return (this._data.msg_id == 7 && this._data.type == 'battery' &&  this._data.param);
};

BatteryUpdateResponse.prototype.process = function() {
    var level = this._data.param;
    console.log('BatteryUpdateResponse : Battery update (' + level + '%)');

    // Notify battery listeners of its new level
    var BatteryActions = require('../../../actions/BatteryActions');
    BatteryActions.setBatteryLevel(level);
};

module.exports = BatteryUpdateResponse;
