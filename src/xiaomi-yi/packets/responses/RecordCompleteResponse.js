'use strict';

var AbstractResponse = require('../AbstractResponse');

/**
 * Packet : Record Complete
 * Description : Sent by the camera after a video was recorded
 * Opcode : 7 (with 'video_record_complete' data type)
 */
var RecordCompleteResponse = function() {
    AbstractResponse.call(this);
};

RecordCompleteResponse.prototype = Object.create(AbstractResponse.prototype);
RecordCompleteResponse.prototype.constructor = RecordCompleteResponse;

RecordCompleteResponse.prototype.matches = function() {
    return (this._data.msg_id == 7 && this._data.type == 'video_record_complete' &&  this._data.param);
};

RecordCompleteResponse.prototype.process = function() {
    var path = this._data.param;
    console.log('RecordCompleteResponse : ' + path);

    // Notify listeners
    var VideosActions = require('../../../actions/VideosActions');
    VideosActions.recordComplete(path);
};

module.exports = RecordCompleteResponse;
