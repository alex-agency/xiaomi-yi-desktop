import AbstractResponse from '../AbstractResponse';

/**
 * Packet : Battery update
 * Description : Sent by the camera after a battery level change or a "Get Battery Level" request
 * Opcode : 7 or 13 (with 'battery' data type)
 */
export default class BatteryUpdateResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return ((this._data.msg_id == 7 || this._data.msg_id == 13) && this._data.type == 'battery' &&  this._data.param);
    }

    process() {
        let level = this._data.param;
        console.log('BatteryUpdateResponse : Battery update (' + level + '%)');

        // Notify battery listeners of its new level
        let BatteryActions = require('../../../actions/BatteryActions');
        BatteryActions.setBatteryLevel(level);
    }
}
