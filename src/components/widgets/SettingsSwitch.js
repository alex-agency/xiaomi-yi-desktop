import React from 'react';

import CameraCommands from '../../xiaomi-yi/CameraCommands';

// Actions
import SettingsActions from '../../actions/SettingsActions';

// Components
import Spinner from './Spinner';

const SettingsSwitch = React.createClass({
    propTypes: {
        setting: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        currentValue: React.PropTypes.string,
        readonly: React.PropTypes.bool,
        relatedSettings: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            updateTimer: undefined
        };
    },

    componentDidMount: function() {
        this.startRefresh();
    },

    componentDidUpdate: function(prevProps, prevState) {
        this.startRefresh();
    },

    componentWillUnmount: function() {
        clearInterval(this.state.updateTimer);
    },

    startRefresh: function() {
        clearInterval(this.state.updateTimer);

        // Check if the command has been successfuly processed by the camera
        this.state.updateTimer = setInterval(() => {
            if (this.props.currentValue) {
                clearInterval(this.state.updateTimer);
            }
            else {
                CameraCommands.getSetting(this.props.setting);
            }
        }, 500);
    },

    updateRelatedSettings: function() {
        if (this.props.relatedSettings) {
            for (let i=0; i < this.props.relatedSettings.length; i++) {
                let setting = this.props.relatedSettings[i];
                SettingsActions.setValue(setting, undefined); // Reset value
                SettingsActions.setChoices(setting, {}, false); // Reset choices
            }
        }
    },

    handleChange: function(event) {
        let setting = this.props.setting;
        let value = event.target.checked ? 'on': 'off';

        console.log('SettingsSwitch: Setting '+setting+' = '+value);
        CameraCommands.setSetting(setting, value);
        SettingsActions.setValue(setting, undefined); // Display spinner

        this.updateRelatedSettings();
    },

    render() {
        let settingName = this.props.setting;
        let label = this.props.label;
        let currentValue = this.props.currentValue;

        let isChecked = (currentValue === 'on');
        let isReadOnly = this.props.readonly;

        // Display spinner if no current value
        let input;
        if (!currentValue) {
            input = <Spinner />;
        }
        else {
            input = <input type="checkbox" name={settingName} checked={isChecked ? 'checked' : false} onChange={this.handleChange} disabled={isReadOnly} />;
        }

        return (
            <div className="settings-row">
                <span className="settings-label">{label}</span>
                {input}
            </div>
        )
    }
});

export default SettingsSwitch;
