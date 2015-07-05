'use strict';

var mcFly = require('../flux/mcFly');

var StatusAction = mcFly.createActions({
    setConnected: function() {
        return {
            actionType: 'CONNECTED'
        }
    },
    setDisconnected: function() {
        return {
            actionType: 'DISCONNECTED'
        }
    }
});

module.exports = StatusAction;
