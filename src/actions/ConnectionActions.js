'use strict';

var mcFly = require('../flux/mcFly');

var ConnectionConstants = require('../constants/ConnectionConstants');

var ConnectionAction = mcFly.createActions({
    setConnected: function(connected) {
        return {
            actionType: connected ? ConnectionConstants.CONNECTION_CONNECTED : ConnectionConstants.CONNECTION_DISCONNECTED
        }
    }
});

module.exports = ConnectionAction;
