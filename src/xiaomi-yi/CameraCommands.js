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

    getBatteryLevel(connection) {
        connection.send(new GetBatteryLevelRequest());
    }

    getSettingChoices(connection, setting) {
        connection.send(new GetSettingChoicesRequest(setting));
    }

    getSetting(connection, setting) {
        connection.send(new GetSettingRequest(setting));
    }

    getSettings(connection) {
        connection.send(new GetSettingsRequest());
    }

    getSpace(connection, type) {
        connection.send(new GetSpaceRequest(type));
    }

    setSetting(connection, setting, value) {
        connection.send(new SetSettingRequest(setting, value));
    }

    startSession(connection) {
        connection.send(new StartSessionRequest());
    }
}

export default new CameraCommands();
