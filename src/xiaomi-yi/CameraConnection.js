const remote = window.require('remote');
const net = remote.require('net');

import AbstractRequest from './packets/AbstractRequest';
import CameraCommands from './CameraCommands';
import PacketHandler from './PacketHandler';

// Actions
import ConnectionActions from '../actions/ConnectionActions';

class CameraConnection {
    constructor() {
        this._socket = undefined;
        this._ip = undefined;
        this._port = undefined;
        this._token = 0;
        this._buffer = '';
    }

    initialize(options) {
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

    start() {
        console.log("CameraConnection: Start");

        if (!this._ip || !this._port) {
            throw new Error('CameraConnection: Connection not initialized, call CameraConnection.initialize(options) first');
        }

        if (this._socket !== undefined) {
            throw new Error('CameraConnection: CameraConnection.start() was already called');
        }

        this._socket = new net.Socket();
        this._socket.setEncoding('utf8');

        // On connect : Notify status store and ask for a token
        this._socket.on('connect', () => {
            console.log("CameraConnection: Connected");

            // Reset token
            this._token = 0;

            // Import CameraCommands here to avoid circular references
            CameraCommands.startSession();

            // Notify stores
            ConnectionActions.setConnected(true);
        });

        // On data : Handle received packet
        this._socket.on('data', (data) => {
            // Some packets are not received in only one pass so we have to assemble them...
            try {
                // If the buffer is a valid JSON string replace the current buffer
                JSON.parse(data);
                this._buffer = data;
            }
            catch(e) {
                // No JSON, possibly part of another packet, append it to current buffer
                this._buffer += data;
            }

            // Check if the buffer is a valid JSON string
            try {
                JSON.parse(this._buffer);

                if (!PacketHandler.handle(this._buffer)) {
                    console.log("CameraConnection: Data not fully handled", data);
                }

                // Clear buffer
                this._buffer = '';
            }
            catch(e) {
                // Ignore buffer and hope the next packet fixes it
            }
        });

        // On error
        this._socket.on('error', (error) => {
            console.log("CameraConnection: Error " + error.code);
        });

        // On close : Notify status store and schedule a reconnection
        this._socket.on('close', () => {
            console.log("CameraConnection: Connection closed");

            // Notify stores
            ConnectionActions.setConnected(false);

            // Auto reconnect
            console.log("CameraConnection: Scheduling reconnection in 5s");
            setTimeout(
                () => {
                    console.log("CameraConnection: Connecting to " + this._ip + ":" + this._port);
                    this._socket.connect(this._port, this._ip);
                },
                5000
            );
        });

        console.log("CameraConnection: Connecting to " + this._ip + ":" + this._port);
        this._socket.connect(this._port, this._ip);

        return this;
    }

    setToken(token) {
        this._token = token;

        return this;
    }

    send(request) {
        if (!(request instanceof AbstractRequest)) {
            throw new Error('CameraConnection: CameraConnection.send requires an AbstractRequest as a parameter');
        }

        if (this._socket) {
            let packet = request.setToken(this._token).getPacket();
            this._socket.write(packet);
        }
    }
}

export default new CameraConnection();
