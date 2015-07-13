import React from 'react';

import CameraConnection from '../../xiaomi-yi/CameraConnection';
import CameraCommands from '../../xiaomi-yi/CameraCommands';

// Actions
import SettingsActions from '../../actions/SettingsActions';

// Components
import Spinner from './Spinner';

const SettingsSwitch = React.createClass({
    propTypes: {
        setting: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        currentValue: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            updateTimer: undefined
        };
    },

    componentWillUnmount: function() {
        clearInterval(this.state.updateTimer);
    },

    handleChange: function(event) {
        let setting = this.props.setting;
        let value = event.target.checked ? 'on': 'off';

        console.log('SettingsSwitch: Setting '+setting+' = '+value);
        CameraCommands.setSetting(CameraConnection, setting, value);
        SettingsActions.setValue(setting, undefined); // Display spinner

        // Check if the command has been successfuly processed by the camera
        this.state.updateTimer = setInterval(() => {
            if (this.props.currentValue) {
                clearInterval(this.state.updateTimer);
            }
            else {
                CameraCommands.getSetting(CameraConnection, this.props.setting);
            }
        }, 1000);
    },

    render() {
        let settingName = this.props.setting;
        let label = this.props.label;
        let currentValue = this.props.currentValue;

        let isChecked = (currentValue === 'on');

        // Display spinner if no current value
        let input;
        if (!currentValue) {
            input = <Spinner />;
        }
        else {
            input = <input type="checkbox" name={settingName} checked={isChecked ? 'checked' : false}  onChange={this.handleChange} />;
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
