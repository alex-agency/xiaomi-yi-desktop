'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Record Start
 * Description : Sent by the camera when a record starts
 * Opcode : 7 (with 'start_video_record' data type)
 */
var RecordStartResponse = function() {
    AbstractResponse.call(this);
};

RecordStartResponse.prototype = Object.create(AbstractResponse.prototype);
RecordStartResponse.prototype.constructor = RecordStartResponse;

RecordStartResponse.prototype.matches = function() {
    return (this._data.msg_id == 7 && this._data.type == 'start_video_record');
};

RecordStartResponse.prototype.process = function() {
    console.log('RecordStartResponse : Record started');

    // Notify record listeners
    var VideosActions = require('../../../actions/VideosActions');
    VideosActions.recordStart();
};

module.exports = RecordStartResponse;
