import React from 'react';

// Stores
import VideosStore from '../../stores/VideosStore';

// Components
import VideoThumbnail from '../widgets/VideoThumbnail';

const getState = function() {
    return {
        videos: VideosStore.getVideos()
    }
};

const Videos = React.createClass({
    mixins: [VideosStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        let videos = [];

        for (let i=0; i<this.state.videos.length; i++) {
            let path = this.state.videos[i];
            videos.push(<VideoThumbnail src={path} caption={path}/>);
        }

        return (
            <div className="panel">
                {videos}
            </div>
        )
    }
});

export default Videos;
