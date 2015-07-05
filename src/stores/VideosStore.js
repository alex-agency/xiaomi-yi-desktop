'use strict';

var mcFly = require('../flux/mcFly');

var VideosConstants = require('../constants/VideosConstants');

var _videos = [];

function addVideo(path) {
    if (_videos.indexOf(path) < 0) {
        _videos.push(path);
    }
};

function removeVideo(path) {
    var index = _videos.indexOf(path);
    if (index >= 0) {
        _videos.splice(index, 1);
    }
};

function clearVideos() {
    _videos = [];
};

var VideosStore = mcFly.createStore({
    getVideos: function() {
        return _videos;
    }
}, function(payload){
    switch(payload.actionType) {
        case VideosConstants.VIDEOS_ADD:
            addVideo(payload.path);
            break;
        case VideosConstants.VIDEOS_REMOVE:
            removeVideo(payload.path);
            break;
        case VideosConstants.VIDEOS_CLEAR:
            clearVideos();
            break;
        default:
            return true;
    }

    VideosStore.emitChange();

    return true;
});

module.exports = VideosStore;
