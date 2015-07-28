import CameraConnection from './CameraConnection';

import GetBatteryLevelRequest from './packets/requests/GetBatteryLevelRequest';
import GetSettingChoicesRequest from './packets/requests/GetSettingChoicesRequest';
import GetSettingRequest from './packets/requests/GetSettingRequest';
import GetSettingsRequest from './packets/requests/GetSettingsRequest';
import GetSpaceRequest from './packets/requests/GetSpaceRequest';
import SetSettingRequest from './packets/requests/SetSettingRequest';
import StartSessionRequest from './packets/requests/StartSessionRequest';

class CameraCommands {
    constructor() {
    }

    getBatteryLevel() {
        CameraConnection.send(new GetBatteryLevelRequest());
    }

    getSettingChoices(setting) {
        CameraConnection.send(new GetSettingChoicesRequest(setting));
    }

    getSetting(setting) {
        CameraConnection.send(new GetSettingRequest(setting));
    }

    getSettings() {
        CameraConnection.send(new GetSettingsRequest());
    }

    getSpace(type) {
        CameraConnection.send(new GetSpaceRequest(type));
    }

    setSetting(setting, value) {
        CameraConnection.send(new SetSettingRequest(setting, value));
    }

    startSession() {
        CameraConnection.send(new StartSessionRequest());
    }
}

export default new CameraCommands();
