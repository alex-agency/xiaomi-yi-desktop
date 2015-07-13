import AbstractResponse from '../AbstractResponse';
import VideosActions from '../../../actions/VideosActions';

/**
 * Packet : Record Complete
 * Description : Sent by the camera after a video was recorded
 * Opcode : 7 (with 'video_record_complete' data type)
 */
export default class RecordCompleteResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 7 && this._data.type == 'video_record_complete' &&  this._data.param);
    }

    process() {
        let path = this._data.param;
        console.log('RecordCompleteResponse : ' + path);

        // Notify listeners
        VideosActions.recordComplete(path);
    }
}
