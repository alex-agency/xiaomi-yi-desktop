import mcFly from '../flux/mcFly';

import {SETTINGS_UPDATE_VALUE} from '../constants/SettingsConstants';

let _settings = {};

function setValue(name, value) {
    _settings[name] = value;
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
        default:
            return true;
    }

    SettingsStore.emitChange();

    return true;
});

export default SettingsStore;
