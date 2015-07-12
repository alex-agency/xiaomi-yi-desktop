import AbstractResponse from '../AbstractResponse';

/**
 * Packet : Settings update
 * Description : Sent by the camera after a "Get settings" request
 * Opcode : 3
 */
export default class GetSettingsResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 3 &&  this._data.param);
    }

    process() {
        let settings = this._data.param;

        for (let i=0; i<settings.length; i++) {
            for (let key in settings[i]) {
                let value = settings[i][key];
                console.log('GetSettingsResponse: '+key+' = '+value);
            }
        }

        // TODO Call SettingsStore
    }
}
