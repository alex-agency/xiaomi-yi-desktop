'use strict';

var React = require('react');
var classNames = require( 'classnames' );

// Stores
var StatusStore = require('../../stores/StatusStore');

var getState = function() {
    return {
        connected: StatusStore.isConnected(),
        batteryLevel: StatusStore.getBatteryLevel(),
        elapsedRecordTime: StatusStore.getElapsedRecordTime()
    }
};

var Status = React.createClass({
    mixins: [StatusStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    getFormattedTime: function(time) {
        var label = '00:00:00';

        if (time) {
            var hours = Math.floor(time / 3600);
            var minutes = Math.floor((time - (hours*3600)) / 60);
            var seconds = time - (hours*3600) - (minutes * 60);

            label = ('0' + hours).slice(-2)+':'+('0' + minutes).slice(-2)+':'+('0' + seconds).slice(-2);
        }

        return label;
    },

    render() {
        // Record Status
        var recordStatusClasses = classNames({
            'recording-status': true,
            'recording': this.state.elapsedRecordTime !== undefined
        });

        // Battery
        var batteryLevelClasses = classNames({
            'battery-level': true,
            'connected': this.state.connected,
            'red' : !this.state.batteryLevel || this.state.batteryLevel < 15,
            'purple' : this.state.batteryLevel && this.state.batteryLevel >= 15 && this.state.batteryLevel < 50,
            'blue' : this.state.batteryLevel && this.state.batteryLevel >= 50
        });

        // Connection Status
        var connectionStatusClasses = classNames({
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

module.exports = Status;
