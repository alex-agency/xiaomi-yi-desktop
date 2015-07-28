import React from 'react';

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
        this.state.updateTimer = setInterval(() => {
            if ((this.props.choices && Object.keys(this.props.choices).length) && this.props.currentValue) {
                clearInterval(this.state.updateTimer);
            }

            if (!(this.props.choices && Object.keys(this.props.choices).length)) {
                CameraCommands.getSettingChoices(this.props.setting);
            }

            if (!this.props.currentValue) {
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
        let value = event.target.value;

        console.log('SettingsChoice: Setting '+setting+' = '+value);
        CameraCommands.setSetting(setting, value);
        SettingsActions.setValue(setting, undefined); // Display spinner

        this.updateRelatedSettings();
    },

    render() {
        let settingName = this.props.setting;
        let label = this.props.label;
        let currentValue = this.props.currentValue;

        let isReadOnly = this.props.readonly;

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
            input = <select name={settingName} value={currentValue} onChange={this.handleChange} disabled={isReadOnly}>{selectOptions}</select>;
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
