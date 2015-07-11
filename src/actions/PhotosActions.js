'use strict';

import mcFly from '../flux/mcFly';

import {PHOTOS_ADD, PHOTOS_REMOVE, PHOTOS_PHOTO_TAKEN} from '../constants/PhotosConstants';

const PhotosAction = mcFly.createActions({
    addPhoto: function(path) {
        return {
            actionType: PHOTOS_ADD,
            path: path
        }
    },
    removePhoto: function(path) {
        return {
            actionType: PHOTOS_REMOVE,
            path: path
        }
    },
    clearPhotos: function() {
        return {
            actionType: PHOTOS_CLEAR
        }
    },
    photoTaken: function(path) {
        return {
            actionType: PHOTOS_PHOTO_TAKEN,
            path: path
        }
    }
});

export default PhotosAction;
