import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get setting choices
 * Description : Sent by the client to retrieve available choices for a setting
 * Opcode : 9
 */
export default class GetSettingChoicesRequest extends AbstractRequest {
    constructor(setting) {
        super(9);
        this._params['param'] = setting;
    }
}
