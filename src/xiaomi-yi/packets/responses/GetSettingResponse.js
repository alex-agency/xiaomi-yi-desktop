import AbstractResponse from '../AbstractResponse';
import SettingsActions from '../../../actions/SettingsActions';

/**
 * Packet : Setting update
 * Description : Sent by the camera after a "Get setting" request
 * Opcode : 1
 */
export default class GetSettingResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 1 &&  this._data.type && this._data.param);
    }

    process() {
        console.log('GetSettingResponse: '+this._data.type+' = '+this._data.param);

        // Notify settings listeners of the new value
        SettingsActions.setValue(this._data.type, this._data.param);
    }
}
