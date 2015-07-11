'use strict';

import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get battery level
 * Description : Sent by the client to retrieve the battery level
 * Opcode : 13
 */
export default class GetBatteryLevelRequest  extends AbstractRequest {
    constructor() {
        super(13);
    }
}
