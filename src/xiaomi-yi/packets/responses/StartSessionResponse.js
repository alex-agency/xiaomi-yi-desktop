import AbstractResponse from '../AbstractResponse';
import CameraConnection from '../../CameraConnection';
import CameraCommands from '../../CameraCommands';

/**
 * Packet : Start session
 * Description : Sent by the camera after a "Start session request"
 * Opcode : 257
 */
export default class StartSessionResponse extends AbstractResponse {
    constructor() {
        super();
    }

    matches() {
        return (this._data.msg_id == 257 && this._data.param);
    }

    process() {
        let token = this._data.param;
        console.log('StartSessionResponse: Token update (' + token + ')');

        // Send new token to the CameraConnection
        CameraConnection.setToken(token);

        // Send a GetBatteryLevel request
        CameraCommands.getBatteryLevel(CameraConnection);

        // Send GetSettings request
        CameraCommands.getSettings(CameraConnection);
    }
}
