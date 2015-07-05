'use strict';

var mcFly = require('../flux/mcFly');

var ConnectionConstants = require('../constants/ConnectionConstants');

var _connected = false;

function setConnected(connected) {
    _connected = connected;
};

var ConnectionErrorStore = mcFly.createStore({
    isConnected: function() {
        return _connected;
    }
}, function(payload){
    switch(payload.actionType) {
        case ConnectionConstants.CONNECTION_CONNECTED:
            setConnected(true);
            break;
        case ConnectionConstants.CONNECTION_DISCONNECTED:
            setConnected(false);
            break;
        default:
            return true;
    }

    ConnectionErrorStore.emitChange();

    return true;
});

module.exports = ConnectionErrorStore;
