'use strict';

var React = require('react');
var classNames = require( 'classnames' );

// Stores
var StatusStore = require('../../stores/StatusStore');

var getState = function() {
    return {
        connected: StatusStore.isConnected()
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
        var widgetClasses = classNames({
            'status-widget': true,
            'connected': this.state.connected
        });
        return (
            <div className={widgetClasses}>
                <span className="octicon octicon-radio-tower status-icon"></span>
                <span className="status-label">{this.state.connected ? 'Connected' : 'Disconnected'}</span>
            </div>
        )
    }
});

module.exports = Status;
