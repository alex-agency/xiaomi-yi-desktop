'use strict';

var AbstractRequest = require('../AbstractRequest');

/**
 * Packet : Start session
 * Description : Sent by the client to retrieve a new session token
 * Opcode : 257
 */
var StartSessionRequest = function() {
    AbstractRequest.call(this, 257);
};

StartSessionRequest.prototype = Object.create(AbstractRequest.prototype);
StartSessionRequest.prototype.constructor = StartSessionRequest;

module.exports = StartSessionRequest;
