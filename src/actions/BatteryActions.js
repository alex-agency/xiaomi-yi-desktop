'use strict';

import mcFly from '../flux/mcFly';

import {BATTERY_UPDATE} from '../constants/BatteryConstants';

const BatteryAction = mcFly.createActions({
    setBatteryLevel: function(level) {
        return {
            actionType: BATTERY_UPDATE,
            level: level
        }
    }
});

export default BatteryAction;
