'use strict';

var mcFly = require('../flux/mcFly');

var PhotosAction = mcFly.createActions({
    addPhoto: function(path) {
        return {
            actionType: 'ADD',
            path: path
        }
    },
    removePhoto: function(path) {
        return {
            actionType: 'REMOVE',
            path: path
        }
    },
    clearPhotos: function() {
        return {
            actionType: 'CLEAR'
        }
    }
});

module.exports = PhotosAction;
