'use strict';

var React = require('react');
var classNames = require( 'classnames' );

// Stores
var ConnectionErrorStore = require('../../stores/ConnectionErrorStore');

var getState = function() {
    return {
        connected: ConnectionErrorStore.isConnected()
    }
};

var Header = React.createClass({
    mixins: [ConnectionErrorStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        var statusClasses = classNames({
            'disconnected': !this.state.connected
        });
        return (
            <div id="connection-error" className={statusClasses}>
                <div className="title"><span className="mega-octicon octicon-alert"></span> Connection error</div>
                <div className="help">
                    <p>It looks like your Xiaomi Yi camera is currently not reachable.</p>
                    <p>In order to solve this issue :</p>
                    <ul>
                        <li>
                            Check if Wi-Fi is enabled on the camera (the blue LED should be blinking)
                            <img src="../build/images/xiaomi-yi-wifi-enabled.png" />
                        </li>
                        <li>
                            Check if your computer is connected to it (default password is 1234567890)
                            <img src="../build/images/wifi-connected.png" />
                        </li>
                    </ul>
                    <p>If the problem persists, turn your camera off and on again and restart the app.</p>
                </div>
            </div>
        )
    }
});

module.exports = Header;
