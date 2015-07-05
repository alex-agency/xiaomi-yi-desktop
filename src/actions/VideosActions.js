'use strict';

var mcFly = require('../flux/mcFly');

var VideosActions = mcFly.createActions({
    addVideo: function(path) {
        return {
            actionType: 'ADD',
            path: path
        }
    },
    removeVideo: function(path) {
        return {
            actionType: 'REMOVE',
            path: path
        }
    },
    clearVideos: function() {
        return {
            actionType: 'CLEAR'
        }
    }
});

module.exports = VideosActions;
