'use strict';

/**
 * Common class for packets that can be received from the camera.
 */
var AbstractResponse = function() {
    this._data = undefined;
};

/**
 * Check if the content of this._data matches the
 * response specification.
 */
AbstractResponse.prototype.matches = function() {
    return false;
};

/**
 * Called when the packet can be handled (the action).
 */
AbstractResponse.prototype.process = function() {
    return false;
};

/**
 * Try to parse the string sent by the server and
 * put it into this._data.
 *
 * In most cases this method should not be overridden.
 */
AbstractResponse.prototype.parse = function(data) {
    try {
        this._data = JSON.parse(data);
        return this._data ? true : false;
    } catch (e) {
        return false;
    }
};

/**
 * Called by the PacketHandler with the received data.
 *
 * In most cases this method should not be overridden.
 */
AbstractResponse.prototype.handle = function(data) {
    if (this.parse(data) && this.matches()) {
        this.process();
        return true;
    }

    return false;
};

module.exports = AbstractResponse;
