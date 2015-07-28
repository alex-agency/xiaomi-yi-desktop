import AbstractResponse from '../AbstractResponse';
import SettingsActions from '../../../actions/SettingsActions';

/**
 * Packet : Settings choices update
 * Description : Sent by the camera after a "Get setting choices" request
 * Opcode : 9
 */
export default class GetSettingChoicesResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (
            this._data.msg_id == 9 &&
            this._data.param &&
            (this._data.permission === 'settable' || this._data.permission === 'readonly') &&
            this._data.options
        );
    }

    process() {
        let setting = this._data.param;
        let options = this._data.options;
        let permission = this._data.permission;

        console.log('GetSettingChoicesResponse: '+setting+' = '+options);

        let choices = {};
        for (let i=0; i<options.length; i++) {
            choices[options[i]] = options[i].charAt(0).toUpperCase() + options[i].slice(1);
        }

        // Notify settings listeners of the new choices
        SettingsActions.setChoices(setting, choices, (permission === 'readonly'));
    }
}
