import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get settings
 * Description : Sent by the client to retrieve all the current settings
 * Opcode : 3
 */
export default class GetSettingsRequest extends AbstractRequest {
    constructor() {
        super(3);
    }
}
