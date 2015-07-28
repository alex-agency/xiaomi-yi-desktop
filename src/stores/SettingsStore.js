import mcFly from '../flux/mcFly';

import {SETTINGS_UPDATE_VALUE, SETTINGS_UPDATE_CHOICES} from '../constants/SettingsConstants';

let _settings = {};

function getSetting(name) {
    if (!_settings[name]) {
        _settings[name] = {
            'value': undefined,
            'readonly': false,
            'choices' : {}
        }
    }
    return _settings[name];
};

function setValue(name, value) {
    getSetting(name).value = value;
};

function setChoices(name, choices, readonly) {
    var setting = getSetting(name);
    setting.choices = choices;
    setting.readonly = readonly;
};

const SettingsStore = mcFly.createStore({
    getSettings: function() {
        return _settings;
    }
}, function(payload){
    switch(payload.actionType) {
        case SETTINGS_UPDATE_VALUE:
            setValue(payload.name, payload.value);
            break;
        case SETTINGS_UPDATE_CHOICES:
            setChoices(payload.name, payload.choices, payload.readonly);
            break;
        default:
            return true;
    }

    SettingsStore.emitChange();

    return true;
});

export default SettingsStore;
