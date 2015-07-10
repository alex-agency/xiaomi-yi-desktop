'use strict';

var mcFly = require('../flux/mcFly');

var BatteryConstants = require('../constants/BatteryConstants');
var ConnectionConstants = require('../constants/ConnectionConstants');
var VideosConstants = require('../constants/VideosConstants');

var _connected = false;
var _batteryLevel = undefined;
var _elapsedRecordTime = undefined;

function setConnected(connected) {
    _connected = connected;
};

function setBatteryLevel(batteryLevel) {
    _batteryLevel = batteryLevel;
};

function setElapsedRecordTime(elapsedRecordTime) {
    _elapsedRecordTime = elapsedRecordTime;
};

var StatusStore = mcFly.createStore({
    isConnected: function() {
        return _connected;
    },
    getBatteryLevel: function() {
        return _batteryLevel;
    },
    getElapsedRecordTime: function() {
        return _elapsedRecordTime;
    }
}, function(payload){
    switch(payload.actionType) {
        case BatteryConstants.BATTERY_UPDATE:
            setBatteryLevel(payload.level);
            break;
        case ConnectionConstants.CONNECTION_CONNECTED:
            setConnected(true);
            break;
        case ConnectionConstants.CONNECTION_DISCONNECTED:
            setConnected(false);
            setBatteryLevel(undefined);
            break;
        case VideosConstants.VIDEOS_RECORD_START:
            setElapsedRecordTime(0);
            break;
        case VideosConstants.VIDEOS_RECORD_COMPLETE:
            setElapsedRecordTime(undefined);
            break;
        case VideosConstants.VIDEOS_RECORD_TIME:
            setElapsedRecordTime(payload.elapsedTime);
            break;
        default:
            return true;
    }

    StatusStore.emitChange();

    return true;
});

module.exports = StatusStore;
