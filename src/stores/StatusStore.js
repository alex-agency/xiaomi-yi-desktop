'use strict';

var mcFly = require('../flux/mcFly');

var BatteryConstants = require('../constants/BatteryConstants');
var ConnectionConstants = require('../constants/ConnectionConstants');

var _connected = false;
var _batteryLevel = undefined;

function setConnected(connected) {
    _connected = connected;
};

function setBatteryLevel(batteryLevel) {
    _batteryLevel = batteryLevel;
};

var StatusStore = mcFly.createStore({
    isConnected: function() {
        return _connected;
    },
    getBatteryLevel: function() {
        return _batteryLevel;
    }
}, function(payload){
    switch(payload.actionType) {
        case ConnectionConstants.CONNECTION_CONNECTED:
            setConnected(true);
            break;
        case ConnectionConstants.CONNECTION_DISCONNECTED:
            setConnected(false);
            setBatteryLevel(undefined);
            break;
        case BatteryConstants.BATTERY_UPDATE:
            setBatteryLevel(payload.level);
            break;
        default:
            return true;
    }

    StatusStore.emitChange();

    return true;
});

module.exports = StatusStore;
