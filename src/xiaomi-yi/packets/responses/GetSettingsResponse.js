import AbstractResponse from '../AbstractResponse';
import SettingsActions from '../../../actions/SettingsActions';

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


                if (value.startsWith('settable:')) {
                    let set = value.slice(9).split('#');
                    let choices = {};
                    for (let j = 0; j<set.length; j++) {
                        choices[set[j]] = set[j].charAt(0).toUpperCase() + set[j].slice(1);;
                    }

                    // Notify settings listeners of the new choices
                    SettingsActions.setChoices(key, choices);
                }
                else {
                    // Notify settings listeners of the new value
                    SettingsActions.setValue(key, value);
                }
            }
        }
    }
}
