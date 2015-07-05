'use strict';

var React = require('react');

// Stores
var VideosStore = require('../../stores/VideosStore');

// Components
var VideoThumbnail = require('../widgets/VideoThumbnail');

var getState = function() {
    return {
        videos: VideosStore.getVideos()
    }
};

var Videos = React.createClass({
    mixins: [VideosStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        var videos = [];

        for (var i=0; i<this.state.videos.length; i++) {
            var path = this.state.videos[i];
            videos.push(<VideoThumbnail src={path} caption={path}/>);
        }

        return (
            <div className="panel">
                {videos}
            </div>
        )
    }
});

module.exports = Videos;
