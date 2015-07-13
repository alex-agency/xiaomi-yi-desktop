import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get setting
 * Description : Sent by the client to retrieve the current value of a single setting
 * Opcode : 1
 */
export default class GetSettingRequest extends AbstractRequest {
    constructor(setting) {
        super(1);
        this._params['type'] = setting;
    }
}
