'use strict';

var React = require('react');
var classNames = require( 'classnames' );

// Stores
var StatusStore = require('../../stores/StatusStore');

var getState = function() {
    return {
        connected: StatusStore.isConnected(),
        batteryLevel: StatusStore.getBatteryLevel()
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

    render() {
        // Widget
        var widgetClasses = classNames({
            'status-widget': true,
            'connected': this.state.connected
        });

        // Battery
        var batteryLevelClasses = classNames({
            'battery-level': true,
            'red' : this.state.batteryLevel || this.state.batteryLevel < 33,
            'purple' : this.state.batteryLevel && this.state.batteryLevel >= 33 && this.state.batteryLevel < 66,
            'blue' : this.state.batteryLevel && this.state.batteryLevel >= 66
        });

        return (
            <div className={widgetClasses}>
                <div className={batteryLevelClasses}>
                    <div className="label">{this.state.batteryLevel !== undefined ? this.state.batteryLevel + '%' : '??%'}</div>
                </div>
                <span className="octicon octicon-radio-tower status-icon"></span>
                <span className="status-label">{this.state.connected ? 'Connected' : 'Disconnected'}</span>
            </div>
        )
    }
});

module.exports = Status;
