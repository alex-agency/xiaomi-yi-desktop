import AbstractResponse from '../AbstractResponse';

/**
 * Packet : Record Time Update
 * Description : Sent by the camera regularly when a video is recording
 * Opcode : 7 (with 'rec_time' data type)
 */
export default class RecordTimeUpdateResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 7 && this._data.type == 'rec_time' &&  this._data.param);
    }

    process() {
        let elapsedTime = this._data.param;
        console.log('RecordTimeUpdateResponse : ' + elapsedTime + ' seconds');

        // Notify record listeners of the elapsed time
        let VideosActions = require('../../../actions/VideosActions');
        VideosActions.recordTimeUpdate(elapsedTime);
    }
}
