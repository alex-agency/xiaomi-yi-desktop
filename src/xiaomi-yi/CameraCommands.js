'use strict';

import GetBatteryLevelRequest from './packets/requests/GetBatteryLevelRequest';
import GetSettingsRequest from './packets/requests/GetSettingsRequest';
import GetSpaceRequest from './packets/requests/GetSpaceRequest';
import StartSessionRequest from './packets/requests/StartSessionRequest';

class CameraCommands {
    constructor() {
    }

    getBatteryLevel(connection) {
        connection.send(new GetBatteryLevelRequest());
    }

    getSettings(connection) {
        connection.send(new GetSettingsRequest());
    }

    getSpace(connection, type) {
        connection.send(new GetSpaceRequest(type));
    }

    startSession(connection) {
        connection.send(new StartSessionRequest());
    }
}

export default new CameraCommands();
