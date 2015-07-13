import AbstractResponse from '../AbstractResponse';
import VideosActions from '../../../actions/VideosActions';

/**
 * Packet : Record Start
 * Description : Sent by the camera when a record starts
 * Opcode : 7 (with 'start_video_record' data type)
 */
export default class RecordStartResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 7 && this._data.type == 'start_video_record');
    }

    process() {
        console.log('RecordStartResponse : Record started');

        // Notify record listeners
        VideosActions.recordStart();
    }
}
