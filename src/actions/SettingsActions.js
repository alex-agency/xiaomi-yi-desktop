import mcFly from '../flux/mcFly';

import {SETTINGS_UPDATE_VALUE, SETTINGS_UPDATE_CHOICES} from '../constants/SettingsConstants';

const SettingsAction = mcFly.createActions({
    setValue: function(name, value) {
        return {
            actionType: SETTINGS_UPDATE_VALUE,
            name: name,
            value: value
        }
    },
    setChoices: function(name, choices) {
        return {
            actionType: SETTINGS_UPDATE_CHOICES,
            name: name,
            choices: choices
        }
    }
});

export default SettingsAction;
