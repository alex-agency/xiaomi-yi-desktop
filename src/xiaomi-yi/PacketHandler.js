'use strict';

var AbstractResponse = require('./packets/AbstractResponse');

var PacketHandler = function() {
    this._responses = [];
};

PacketHandler.prototype.register = function(responses) {
    for (var i=0; i<responses.length; i++) {
        var response = responses[i];

        if (!(response instanceof AbstractResponse)) {
            throw new Error('PacketHandler: PacketHandler.register requires an AbstractResponse as a parameter');
        }

        this._responses.push(response);
    }

    return this;
};

PacketHandler.prototype.handle = function(data) {
    var dataFullyHandled = true;

    // A packet from the camera may contain more than one packet
    // In this case they are just concatenated to each others.
    // Example : { "rval": -9, "msg_id": 5 }{ "rval": -9, "msg_id": 5 }
    var packets = [];
    if (data) {
        packets = data.split(/}{/);
        if (packets.length > 1) {
            for (var i=0; i<packets.length; i++) {
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
    for (var i=0; i<packets.length; i++) {
        var currentPacketHandled = false;
        for (var j=0; j<this._responses.length; j++) {
            currentPacketHandled = currentPacketHandled || this._responses[j].handle(packets[i]);
        }

        if (!currentPacketHandled) {
            console.log("PacketHandler: Unknown packet", packets[i]);
        }

        dataFullyHandled = dataFullyHandled && currentPacketHandled;
    }

    return dataFullyHandled;
};

module.exports = new PacketHandler().register([
    new (require('./packets/responses/BatteryUpdateResponse')),
    new (require('./packets/responses/GetSettingsResponse')),
    new (require('./packets/responses/PhotoTakenResponse')),
    new (require('./packets/responses/RecordCompleteResponse')),
    new (require('./packets/responses/RecordStartResponse')),
    new (require('./packets/responses/RecordTimeUpdateResponse')),
    new (require('./packets/responses/StartSessionResponse'))
]);
