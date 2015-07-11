'use strict';

import mcFly from '../flux/mcFly';

import {VIDEOS_ADD, VIDEOS_REMOVE, VIDEOS_CLEAR} from '../constants/VideosConstants';

let _videos = [];

function addVideo(path) {
    if (_videos.indexOf(path) < 0) {
        _videos.push(path);
    }
};

function removeVideo(path) {
    let index = _videos.indexOf(path);
    if (index >= 0) {
        _videos.splice(index, 1);
    }
};

function clearVideos() {
    _videos = [];
};

const VideosStore = mcFly.createStore({
    getVideos: function() {
        return _videos;
    }
}, function(payload){
    switch(payload.actionType) {
        case VIDEOS_ADD:
            addVideo(payload.path);
            break;
        case VIDEOS_REMOVE:
            removeVideo(payload.path);
            break;
        case VIDEOS_CLEAR:
            clearVideos();
            break;
        default:
            return true;
    }

    VideosStore.emitChange();

    return true;
});

export default VideosStore;
