'use strict';

var mcFly = require('../flux/mcFly');

var PhotosConstants = require('../constants/PhotosConstants');

var PhotosAction = mcFly.createActions({
    addPhoto: function(path) {
        return {
            actionType: PhotosConstants.PHOTOS_ADD,
            path: path
        }
    },
    removePhoto: function(path) {
        return {
            actionType: PhotosConstants.PHOTOS_REMOVE,
            path: path
        }
    },
    clearPhotos: function() {
        return {
            actionType: PhotosConstants.PHOTOS_CLEAR
        }
    },
    photoTaken: function(path) {
        return {
            actionType: PhotosConstants.PHOTOS_PHOTO_TAKEN,
            path: path
        }
    }
});

module.exports = PhotosAction;
