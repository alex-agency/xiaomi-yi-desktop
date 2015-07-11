'use strict';

import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get space
 * Description : Sent by the client to retrieve the total and free space on the camera
 * Opcode : 5
 * Parameters :
 *   - type : free|total
 */
export default class GetSpaceRequest extends AbstractRequest {
    constructor(type) {
        super(5);
        this._params['type'] = type;
    }
}

module.exports = GetSpaceRequest;
