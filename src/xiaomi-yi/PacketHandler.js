import AbstractResponse from './packets/AbstractResponse';

// Packets
import BatteryUpdateResponse from './packets/responses/BatteryUpdateResponse';
import GetSettingChoicesResponse from './packets/responses/GetSettingChoicesResponse';
import GetSettingResponse from './packets/responses/GetSettingResponse';
import GetSettingsResponse from './packets/responses/GetSettingsResponse';
import PhotoTakenResponse from './packets/responses/PhotoTakenResponse';
import RecordCompleteResponse from './packets/responses/RecordCompleteResponse';
import RecordStartResponse from './packets/responses/RecordStartResponse';
import RecordTimeUpdateResponse from './packets/responses/RecordTimeUpdateResponse';
import StartSessionResponse from './packets/responses/StartSessionResponse';

class PacketHandler {
    constructor() {
        this._responses = [];
    }

    register(responses) {
        for (let i=0; i<responses.length; i++) {
            let response = responses[i];

            if (!(response instanceof AbstractResponse)) {
                throw new Error('PacketHandler: PacketHandler.register requires an AbstractResponse as a parameter');
            }

            this._responses.push(response);
        }

        return this;
    }

    handle(data) {
        let dataFullyHandled = true;

        // A packet from the camera may contain more than one packet
        // In this case they are just concatenated to each others.
        // Example : { "rval": -9, "msg_id": 5 }{ "rval": -9, "msg_id": 5 }
        let packets = [];
        if (data) {
            packets = data.split(/}{/);
            if (packets.length > 1) {
                for (let i=0; i<packets.length; i++) {
                    if (i > 0) {
                        packets[i] = '{'+packets[i];
                    }
                    if (i < (packets.length-1)) {
                        packets[i] = packets[i] + '}';
                    }
                }
            }
        }

        // Iterate over each packet and try to process them
        for (let i=0; i<packets.length; i++) {
            let currentPacketHandled = false;
            for (let j=0; j<this._responses.length; j++) {
                currentPacketHandled = currentPacketHandled || this._responses[j].handle(packets[i]);
            }

            if (!currentPacketHandled) {
                console.log("PacketHandler: Unknown packet", packets[i]);
            }

            dataFullyHandled = dataFullyHandled && currentPacketHandled;
        }

        return dataFullyHandled;
    }
}

export default new PacketHandler().register([
    new BatteryUpdateResponse(),
    new GetSettingChoicesResponse(),
    new GetSettingResponse(),
    new GetSettingsResponse(),
    new PhotoTakenResponse(),
    new RecordCompleteResponse(),
    new RecordStartResponse(),
    new RecordTimeUpdateResponse(),
    new StartSessionResponse()
]);
