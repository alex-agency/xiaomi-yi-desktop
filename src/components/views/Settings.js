import React from 'react';

// Stores
import SettingsStore from '../../stores/SettingsStore';

const getState = function() {
    return {
        settings: SettingsStore.getSettings()
    }
};

const Settings = React.createClass({
    mixins: [SettingsStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        let settings = [];

        for (let key in this.state.settings) {
            settings.push(<div>{key} = {this.state.settings[key]}</div>);
        }

        return (
            <div className="panel">
                {settings}
            </div>
        )
    }
});

export default Settings;
