'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Record Time Update
 * Description : Sent by the camera regularly when a video is recording
 * Opcode : 7 (with 'rec_time' data type)
 */
var RecordTimeUpdateResponse = function() {
    AbstractResponse.call(this);
};

RecordTimeUpdateResponse.prototype = Object.create(AbstractResponse.prototype);
RecordTimeUpdateResponse.prototype.constructor = RecordTimeUpdateResponse;

RecordTimeUpdateResponse.prototype.matches = function() {
    return (this._data.msg_id == 7 && this._data.type == 'rec_time' &&  this._data.param);
};

RecordTimeUpdateResponse.prototype.process = function() {
    var elapsedTime = this._data.param;
    console.log('RecordTimeUpdateResponse : ' + elapsedTime + ' seconds');

    // Notify record listeners of the elapsed time
    var VideosActions = require('../../../actions/VideosActions');
    VideosActions.recordTimeUpdate(elapsedTime);
};

module.exports = RecordTimeUpdateResponse;
