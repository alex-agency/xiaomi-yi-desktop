'use strict';

var mcFly = require('../flux/mcFly');

var _connected = false;

function setConnected(connected) {
    _connected = connected;
};

var StatusStore = mcFly.createStore({
    isConnected: function() {
        return _connected;
    }
}, function(payload){
    switch(payload.actionType) {
        case 'CONNECTED':
            setConnected(true);
            break;
        case 'DISCONNECTED':
            setConnected(false);
            break;
        default:
            return true;
    }

    StatusStore.emitChange();

    return true;
});

module.exports = StatusStore;
