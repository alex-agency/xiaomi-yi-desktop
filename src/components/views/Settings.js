import React from 'react';

// Stores
import SettingsStore from '../../stores/SettingsStore';

// Components
import SettingsChoice from '../widgets/SettingsChoice';
import SettingsSection from '../widgets/SettingsSection';
import SettingsSwitch from '../widgets/SettingsSwitch';

const getState = function() {
    return {
        settings: SettingsStore.getSettings(),
        choices: SettingsStore.getChoices()
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

    getChoices: function(name) {
        return this.state.choices[name] ? this.state.choices[name] : {};
    },

    createChoice: function(setting, label) {
        return (
            <SettingsChoice
                setting={setting}
                label={label}
                currentValue={this.state.settings[setting]}
                choices={this.getChoices(setting)} />
        )
    },

    createSwitch: function(setting, label) {
        return (
            <SettingsSwitch
                setting={setting}
                label={label}
                currentValue={this.state.settings[setting]} />
        )
    },

    render() {
        return (
            <div className="panel settings-container">
                <SettingsSection name="Video">
                    {this.createChoice('video_resolution', 'Video resolution')}
                    {this.createChoice('video_quality', 'Video quality')}
                    {this.createChoice('video_stamp', 'Enable video stamp (date and time)')}
                    {this.createSwitch('timelapse_video', 'Enable video timelapse')}
                    {this.createSwitch('video_rotate', 'Enable 180° video rotation')}
                </SettingsSection>

                <SettingsSection name="Photo">
                    {this.createChoice('photo_size', 'Photo resolution')}
                    {this.createChoice('photo_quality', 'Photo quality')}
                    {this.createChoice('photo_stamp', 'Enable photo stamp (date and time)')}
                </SettingsSection>

                <SettingsSection name="Capture">
                    {this.createChoice('capture_mode', 'Capture mode')}
                    {this.createSwitch('auto_low_light', 'Enable auto low-light')}
                    {this.createSwitch('loop_record', 'Enable loop recording')}
                    {this.createSwitch('warp_enable', 'Enable warp (disable fisheye effect)')}
                    {this.createChoice('meter_mode', 'Exposure/White balance preset')}
                    {this.createChoice('precise_cont_time', 'Delay between frames in timelapse mode')}
                    {this.createChoice('precise_selftime', 'Delay before capture in timer mode')}
                    {this.createChoice('burst_capture_number', 'Amount of photos taken in burst mode')}
                </SettingsSection>

                <SettingsSection name="System">
                    {this.createChoice('system_mode', 'Current mode')}
                    {this.createChoice('system_default_mode', 'Default mode')}
                    {this.createSwitch('start_wifi_while_booted', 'Start Wi-Fi on boot')}
                    {this.createSwitch('auto_power_off', 'Enable automatic shutdown')}
                    {this.createChoice('led_mode', 'Led mode')}
                    {this.createSwitch('buzzer_ring', 'Enable ring buzzer')}
                    {this.createChoice('buzzer_volume', 'Buzzer volume')}
                </SettingsSection>
            </div>
        )
    }
});

export default Settings;
