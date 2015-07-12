import mcFly from '../flux/mcFly';

import {
    VIDEOS_ADD,
    VIDEOS_REMOVE,
    VIDEOS_CLEAR,
    VIDEOS_RECORD_START,
    VIDEOS_RECORD_COMPLETE,
    VIDEOS_RECORD_TIME
} from '../constants/VideosConstants';

const VideosActions = mcFly.createActions({
    addVideo: function(path) {
        return {
            actionType: VIDEOS_ADD,
            path: path
        }
    },
    removeVideo: function(path) {
        return {
            actionType: VIDEOS_REMOVE,
            path: path
        }
    },
    clearVideos: function() {
        return {
            actionType: VIDEOS_CLEAR
        }
    },
    recordStart: function() {
        return {
            actionType: VIDEOS_RECORD_START
        }
    },
    recordComplete: function(path) {
        return {
            actionType: VIDEOS_RECORD_COMPLETE,
            path: path
        }
    },
    recordTimeUpdate: function(elapsedTime) {
        return {
            actionType: VIDEOS_RECORD_TIME,
            elapsedTime: elapsedTime
        }
    }
});

export default VideosActions;
