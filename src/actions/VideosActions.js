'use strict';

var mcFly = require('../flux/mcFly');

var VideosConstants = require('../constants/VideosConstants');

var VideosActions = mcFly.createActions({
    addVideo: function(path) {
        return {
            actionType: VideosConstants.VIDEOS_ADD,
            path: path
        }
    },
    removeVideo: function(path) {
        return {
            actionType: VideosConstants.VIDEOS_REMOVE,
            path: path
        }
    },
    clearVideos: function() {
        return {
            actionType: VideosConstants.VIDEOS_CLEAR
        }
    },
    recordStart: function() {
        return {
            actionType: VideosConstants.VIDEOS_RECORD_START
        }
    },
    recordComplete: function(path) {
        return {
            actionType: VideosConstants.VIDEOS_RECORD_COMPLETE,
            path: path
        }
    },
    recordTimeUpdate: function(elapsedTime) {
        return {
            actionType: VideosConstants.VIDEOS_RECORD_TIME,
            elapsedTime: elapsedTime
        }
    }
});

module.exports = VideosActions;
