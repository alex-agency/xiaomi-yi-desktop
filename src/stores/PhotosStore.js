import mcFly from '../flux/mcFly';

import {PHOTOS_ADD, PHOTOS_REMOVE, PHOTOS_CLEAR} from '../constants/PhotosConstants';

let _photos = [];

function addPhoto(path) {
    if (_photos.indexOf(path) < 0) {
        _photos.push(path);
    }
};

function removePhoto(path) {
    let index = _photos.indexOf(path);
    if (index >= 0) {
        _photos.splice(index, 1);
    }
};

function clearPhotos() {
    _photos = [];
};

const PhotosStore = mcFly.createStore({
    getPhotos: function() {
        return _photos;
    }
}, function(payload){
    switch(payload.actionType) {
        case PHOTOS_ADD:
            addPhoto(payload.path);
            break;
        case PHOTOS_REMOVE:
            removePhoto(payload.path);
            break;
        case PHOTOS_CLEAR:
            clearPhotos();
            break;
        default:
            return true;
    }

    PhotosStore.emitChange();

    return true;
});

export default PhotosStore;
