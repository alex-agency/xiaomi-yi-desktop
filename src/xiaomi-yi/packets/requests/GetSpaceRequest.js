'use strict';

var AbstractRequest = require('../AbstractRequest');

/**
 * Packet : Get space
 * Description : Sent by the client to retrieve the total and free space on the camera
 * Opcode : 5
 * Parameters :
 *   - type : free|total
 */
var GetSpaceRequest = function(type) {
    AbstractRequest.call(this, 5);
    this._params['type'] = type;
};

GetSpaceRequest.prototype = Object.create(AbstractRequest.prototype);
GetSpaceRequest.prototype.constructor = GetSpaceRequest;

module.exports = GetSpaceRequest;
