'use strict';

var mcFly = require('../flux/mcFly');

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
        case 'ADD':
            addPhoto(payload.path);
            break;
        case 'REMOVE':
            removePhoto(payload.path);
            break;
        case 'CLEAR':
            clearPhotos();
            break;
        default:
            return true;
    }

    PhotosStore.emitChange();

    return true;
});

module.exports = PhotosStore;
