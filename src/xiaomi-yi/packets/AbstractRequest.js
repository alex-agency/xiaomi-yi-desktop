'use strict';

/**
 * Describe a packet sent by the app
 */
var AbstractRequest = function(msgId, params) {
    this._token = undefined;
    this._msgId = msgId;
    this._params = params || [];
};

AbstractRequest.prototype.setToken = function(token) {
    this._token = token;

    return this;
};

AbstractRequest.prototype.getPacket = function() {
    var packet = {};

    if (this._token !== undefined) {
        packet.token = this._token;
    }

    if (this._msgId) {
        packet.msg_id = this._msgId;
    }

    for (var key in this._params) {
        packet[key] = this._params[key];
    }

    return JSON.stringify(packet);
};

module.exports = AbstractRequest;
