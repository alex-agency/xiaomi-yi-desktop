import React from 'react';

import CameraConnection from '../../xiaomi-yi/CameraConnection';
import CameraCommands from '../../xiaomi-yi/CameraCommands';

// Actions
import SettingsActions from '../../actions/SettingsActions';

// Components
import Spinner from './Spinner';

const SettingsChoice = React.createClass({
    propTypes: {
        setting: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        choices: React.PropTypes.object.isRequired,
        currentValue: React.PropTypes.string,
    },

    getInitialState: function() {
        return {
            updateTimer: undefined
        };
    },

    componentDidMount: function() {
        CameraCommands.getSettingChoices(CameraConnection, this.props.setting);

        // In case the camera doesn't response (seems to happen if multiple request
        // are sent at the same time) retry every seconds until we get a response.
        this.state.updateTimer = setInterval(() => {
            if (this.props.choices && Object.keys(this.props.choices).length) {
                clearInterval(this.state.updateTimer);
            }
            else {
                CameraCommands.getSettingChoices(CameraConnection, this.props.setting);
            }
        }, 1000);
    },

    componentWillUnmount: function() {
        clearInterval(this.state.updateTimer);
    },

    handleChange: function(event) {
        let setting = this.props.setting;
        let value = event.target.value;

        console.log('SettingsChoice: Setting '+setting+' = '+value);
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

        let selectOptions = [];

        for (let key in this.props.choices) {
            selectOptions.push(
                <option key={key} value={key}>{this.props.choices[key]}</option>
            );
        }

        // Display spinner if no current value or no choices
        let input;
        if (!currentValue || selectOptions.length == 0) {
            input = <Spinner />;
        }
        else {
            input = <select name={settingName} value={currentValue} onChange={this.handleChange}>{selectOptions}</select>;
        }

        return (
            <div className="settings-row">
                <span className="settings-label">{label}</span>
                {input}
            </div>
        )
    }
});

export default SettingsChoice;
