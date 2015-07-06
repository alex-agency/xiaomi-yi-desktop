'use strict';

var AbstractResponse = require('./packets/AbstractResponse');

// Responses
var BatteryUpdateResponse = require('./packets/responses/BatteryUpdateResponse');
var StartSessionResponse = require('./packets/responses/StartSessionResponse');

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
    var handled = false;

    for (var i=0; i<this._responses.length; i++) {
        handled = handled || this._responses[i].handle(data);
    }

    return handled;
};

module.exports = new PacketHandler().register([
    new BatteryUpdateResponse(),
    new StartSessionResponse()
]);
