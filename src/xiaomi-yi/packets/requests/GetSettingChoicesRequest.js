import AbstractRequest from '../AbstractRequest';

/**
 * Packet : Get setting
 * Description : Sent by the client to retrieve a single setting
 * Opcode : 3
 */
export default class GetSettingChoicesRequest extends AbstractRequest {
    constructor(setting) {
        super(3);
        this._params['param'] = setting;
    }
}
