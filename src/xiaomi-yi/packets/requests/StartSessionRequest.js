'use strict';

import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Start session
 * Description : Sent by the client to retrieve a new session token
 * Opcode : 257
 */
export default class StartSessionRequest extends AbstractRequest {
    constructor() {
        super(257);
    }
}
