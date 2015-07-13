import mcFly from '../flux/mcFly';

import {SETTINGS_UPDATE_VALUE, SETTINGS_UPDATE_CHOICES} from '../constants/SettingsConstants';

let _settings = {};
let _choices = {};

function setValue(name, value) {
    _settings[name] = value;
};

function setChoices(name, choices) {
    _choices[name] = choices;
}

const SettingsStore = mcFly.createStore({
    getSettings: function() {
        return _settings;
    },
    getChoices: function() {
        return _choices;
    }
}, function(payload){
    switch(payload.actionType) {
        case SETTINGS_UPDATE_VALUE:
            setValue(payload.name, payload.value);
            break;
        case SETTINGS_UPDATE_CHOICES:
            setChoices(payload.name, payload.choices);
            break;
        default:
            return true;
    }

    SettingsStore.emitChange();

    return true;
});

export default SettingsStore;
