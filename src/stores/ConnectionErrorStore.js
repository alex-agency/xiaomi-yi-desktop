'use strict';

import mcFly from '../flux/mcFly';

import {CONNECTION_CONNECTED, CONNECTION_DISCONNECTED} from '../constants/ConnectionConstants';

let _connected = false;

function setConnected(connected) {
    _connected = connected;
};

const ConnectionErrorStore = mcFly.createStore({
    isConnected: function() {
        return _connected;
    }
}, function(payload){
    switch(payload.actionType) {
        case CONNECTION_CONNECTED:
            setConnected(true);
            break;
        case CONNECTION_DISCONNECTED:
            setConnected(false);
            break;
        default:
            return true;
    }

    ConnectionErrorStore.emitChange();

    return true;
});

export default ConnectionErrorStore;
