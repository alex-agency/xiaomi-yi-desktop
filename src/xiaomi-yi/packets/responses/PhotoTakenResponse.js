'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Photo Taken
 * Description : Sent by the camera after a photo was taken
 * Opcode : 7 (with 'photo_taken' data type)
 */
var PhotoTakenResponse = function() {
    AbstractResponse.call(this);
};

PhotoTakenResponse.prototype = Object.create(AbstractResponse.prototype);
PhotoTakenResponse.prototype.constructor = PhotoTakenResponse;

PhotoTakenResponse.prototype.matches = function() {
    return (this._data.msg_id == 7 && this._data.type == 'photo_taken' &&  this._data.param);
};

PhotoTakenResponse.prototype.process = function() {
    var path = this._data.param;
    console.log('PhotoTakenResponse : ' + path);

    // Notify listeners
    var PhotosActions = require('../../../actions/PhotosActions');
    PhotosActions.photoTaken(path);
};

module.exports = PhotoTakenResponse;
