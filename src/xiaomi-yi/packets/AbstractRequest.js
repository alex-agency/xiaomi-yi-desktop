'use strict';

/**
 * Describe a packet sent by the app
 */
 export default class AbstractRequest {
    constructor(msgId, params) {
        this._token = undefined;
        this._msgId = msgId;
        this._params = params || [];
    }

    setToken(token) {
        this._token = token;

        return this;
    }

    getPacket() {
        let packet = {};

        if (this._token !== undefined) {
            packet.token = this._token;
        }

        if (this._msgId) {
            packet.msg_id = this._msgId;
        }

        for (let key in this._params) {
            packet[key] = this._params[key];
        }

        return JSON.stringify(packet);
    }
}
