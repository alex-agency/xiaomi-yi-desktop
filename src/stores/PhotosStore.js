'use strict';

var mcFly = require('../flux/mcFly');

var PhotosConstants = require('../constants/PhotosConstants');

var _photos = [];

function addPhoto(path) {
    if (_photos.indexOf(path) < 0) {
        _photos.push(path);
    }
};

function removePhoto(path) {
    var index = _photos.indexOf(path);
    if (index >= 0) {
        _photos.splice(index, 1);
    }
};

function clearPhotos() {
    _photos = [];
};

var PhotosStore = mcFly.createStore({
    getPhotos: function() {
        return _photos;
    }
}, function(payload){
    switch(payload.actionType) {
        case PhotosConstants.PHOTOS_ADD:
            addPhoto(payload.path);
            break;
        case PhotosConstants.PHOTOS_REMOVE:
            removePhoto(payload.path);
            break;
        case PhotosConstants.PHOTOS_CLEAR:
            clearPhotos();
            break;
        default:
            return true;
    }

    PhotosStore.emitChange();

    return true;
});

module.exports = PhotosStore;
