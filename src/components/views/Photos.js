'use strict';

var React = require('react');

// Stores
var PhotosStore = require('../../stores/PhotosStore');

// Components
var PhotoThumbnail = require('../widgets/PhotoThumbnail');

var getState = function() {
    return {
        photos: PhotosStore.getPhotos()
    }
};

var Photos = React.createClass({
    mixins: [PhotosStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        var photos = [];

        for (var i=0; i<this.state.photos.length; i++) {
            var path = this.state.photos[i];
            photos.push(<PhotoThumbnail src={path} caption={path}/>);
        }

        return (
            <div className="panel">
                {photos}
            </div>
        )
    }
});

module.exports = Photos;
