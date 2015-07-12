import mcFly from '../flux/mcFly';

import {SETTINGS_UPDATE_VALUE} from '../constants/SettingsConstants';

const SettingsAction = mcFly.createActions({
    setValue: function(name, value) {
        return {
            actionType: SETTINGS_UPDATE_VALUE,
            name: name,
            value: value
        }
    }
});

export default SettingsAction;
