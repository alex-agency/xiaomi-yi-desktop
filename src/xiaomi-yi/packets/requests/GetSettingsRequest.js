import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get settings
 * Description : Sent by the client to retrieve all the current settings
 * Opcode : 3
 */
export default class GetSettings extends AbstractRequest {
    constructor() {
        super(3);
    }
}
