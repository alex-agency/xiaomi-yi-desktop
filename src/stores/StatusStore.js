import mcFly from '../flux/mcFly';

import {BATTERY_UPDATE} from '../constants/BatteryConstants';
import {CONNECTION_CONNECTED, CONNECTION_DISCONNECTED} from '../constants/ConnectionConstants';
import {VIDEOS_RECORD_START, VIDEOS_RECORD_COMPLETE, VIDEOS_RECORD_TIME} from '../constants/VideosConstants';

let _connected = false;
let _batteryLevel = undefined;
let _elapsedRecordTime = undefined;

function setConnected(connected) {
    _connected = connected;
};

function setBatteryLevel(batteryLevel) {
    _batteryLevel = batteryLevel;
};

function setElapsedRecordTime(elapsedRecordTime) {
    _elapsedRecordTime = elapsedRecordTime;
};

const StatusStore = mcFly.createStore({
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
        case BATTERY_UPDATE:
            setBatteryLevel(payload.level);
            break;
        case CONNECTION_CONNECTED:
            setConnected(true);
            break;
        case CONNECTION_DISCONNECTED:
            setConnected(false);
            setBatteryLevel(undefined);
            break;
        case VIDEOS_RECORD_START:
            setElapsedRecordTime(0);
            break;
        case VIDEOS_RECORD_COMPLETE:
            setElapsedRecordTime(undefined);
            break;
        case VIDEOS_RECORD_TIME:
            setElapsedRecordTime(payload.elapsedTime);
            break;
        default:
            return true;
    }

    StatusStore.emitChange();

    return true;
});

export default StatusStore;
