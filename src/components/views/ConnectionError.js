'use strict';

import React from 'react';
import classNames from 'classnames';

// Stores
import ConnectionErrorStore from '../../stores/ConnectionErrorStore';

const getState = function() {
    return {
        connected: ConnectionErrorStore.isConnected()
    }
};

const ConnectionError = React.createClass({
    mixins: [ConnectionErrorStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        let statusClasses = classNames({
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

export default ConnectionError;
