import AbstractResponse from '../AbstractResponse';
import PhotosActions from '../../../actions/PhotosActions';

/**
 * Packet : Photo Taken
 * Description : Sent by the camera after a photo was taken
 * Opcode : 7 (with 'photo_taken' data type)
 */
export default class PhotoTakenResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 7 && this._data.type == 'photo_taken' &&  this._data.param);
    }

    process() {
        let path = this._data.param;
        console.log('PhotoTakenResponse : ' + path);

        // Notify listeners
        PhotosActions.photoTaken(path);
    }
}
