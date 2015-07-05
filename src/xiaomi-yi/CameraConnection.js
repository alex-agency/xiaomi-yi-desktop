'use strict';

var remote = window.require('remote');
var net = remote.require('net');

// Actions
var ConnectionActions = require('../actions/ConnectionActions');

var CameraConnection = function() {
    this._socket = undefined;
    this._ip = undefined;
    this._port = undefined;
}

CameraConnection.prototype.initialize = function(options) {
    console.log("CameraConnection: Initialize");

    if (!options.ip) {
        throw new Error('CameraConnection: No IP provided');
    }

    if (!options.port) {
        throw new Error('CameraConnection: No port provided');
    }

    this._ip = options.ip;
    this._port = options.port;

    return this;
}

CameraConnection.prototype.start = function() {
    console.log("CameraConnection: Start");

    var self = this;

    if (!this._ip || !this._port) {
        throw new Error('CameraConnection: Connection not initialized, call CameraConnection.initialize(options) first');
    }

    if (this._socket !== undefined) {
        throw new Error('CameraConnection: CameraConnection.start() was already called');
    }

    this._socket = new net.Socket();

    // On connect : Notify status store and ask for a token
    this._socket.on('connect', function() {
        console.log("CameraConnection: Connected");
        ConnectionActions.setConnected(true);
    });

    // On data : Handle received packet
    this._socket.on('data', function(data) {
        console.log("CameraConnection: Data received", data);
    });

    // On error
    this._socket.on('error', function(error) {
        console.log("CameraConnection: Error " + error.code);
    });

    // On close : Notify status store and schedule a reconnection
    this._socket.on('close', function() {
        console.log("CameraConnection: Connection closed");
        ConnectionActions.setConnected(false);

        // Auto reconnect
        console.log("CameraConnection: Scheduling reconnection in 5s");
        setTimeout(
            function(){
                console.log("CameraConnection: Connecting to " + self._ip + ":" + self._port);
                self._socket.connect(self._port, self._ip);
            },
            5000
        );
    });

    console.log("CameraConnection: Connecting to " + this._ip + ":" + this._port);
    this._socket.connect(this._port, this._ip);

    return this;
}

module.exports = new CameraConnection();
