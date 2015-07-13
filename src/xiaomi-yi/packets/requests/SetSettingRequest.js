import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Set setting
 * Description : Sent by the client to set a single setting
 * Opcode : 2
 */
export default class SetSettingRequest extends AbstractRequest {
    constructor(setting, value) {
        super(2);
        this._params['type'] = setting;
        this._params['param'] = value;
    }
}
