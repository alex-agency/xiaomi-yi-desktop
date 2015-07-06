'use strict';

var mcFly = require('../flux/mcFly');

var BatteryConstants = require('../constants/BatteryConstants');

var BatteryAction = mcFly.createActions({
    setBatteryLevel: function(level) {
        return {
            actionType: BatteryConstants.BATTERY_UPDATE,
            level: level
        }
    }
});

module.exports = BatteryAction;
