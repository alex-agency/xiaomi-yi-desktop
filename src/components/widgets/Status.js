import React from 'react';
import classNames from 'classnames';

// Stores
import StatusStore from '../../stores/StatusStore';

const getState = function() {
    return {
        connected: StatusStore.isConnected(),
        batteryLevel: StatusStore.getBatteryLevel(),
        elapsedRecordTime: StatusStore.getElapsedRecordTime()
    }
};

const Status = React.createClass({
    mixins: [StatusStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    getFormattedTime: function(time) {
        let label = '00:00:00';

        if (time) {
            let hours = Math.floor(time / 3600);
            let minutes = Math.floor((time - (hours*3600)) / 60);
            let seconds = time - (hours*3600) - (minutes * 60);

            label = ('0' + hours).slice(-2)+':'+('0' + minutes).slice(-2)+':'+('0' + seconds).slice(-2);
        }

        return label;
    },

    render() {
        // Record Status
        let recordStatusClasses = classNames({
            'recording-status': true,
            'recording': this.state.elapsedRecordTime !== undefined
        });

        // Battery
        let batteryLevelClasses = classNames({
            'battery-level': true,
            'connected': this.state.connected,
            'red' : !this.state.batteryLevel || this.state.batteryLevel < 15,
            'purple' : this.state.batteryLevel && this.state.batteryLevel >= 15 && this.state.batteryLevel < 50,
            'blue' : this.state.batteryLevel && this.state.batteryLevel >= 50
        });

        // Connection Status
        let connectionStatusClasses = classNames({
            'connection-status': true,
            'connected': this.state.connected
        });

        return (
            <div className="status-widget">
                <div className={recordStatusClasses}>
                    <span className="recording-icon"></span>
                    <span className="recording-label">{ this.getFormattedTime(this.state.elapsedRecordTime) }</span>
                </div>
                <div className={batteryLevelClasses}>
                    <div className="label">{this.state.batteryLevel !== undefined ? this.state.batteryLevel + '%' : '??%'}</div>
                </div>
                <div className={connectionStatusClasses}>
                    <span className="octicon octicon-radio-tower status-icon"></span>
                    <span className="status-label">{this.state.connected ? 'Connected' : 'Disconnected'}</span>
                </div>
            </div>
        )
    }
});

export default Status;
