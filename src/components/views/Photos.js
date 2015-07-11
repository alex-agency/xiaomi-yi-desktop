'use strict';

import React from 'react';

// Stores
import PhotosStore from '../../stores/PhotosStore';

// Components
import PhotoThumbnail from '../widgets/PhotoThumbnail';

const getState = function() {
    return {
        photos: PhotosStore.getPhotos()
    }
};

const Photos = React.createClass({
    mixins: [PhotosStore.mixin],

    getInitialState: function() {
        return getState();
    },

    storeDidChange: function() {
        this.setState(getState());
    },

    render() {
        let photos = [];

        for (let i=0; i<this.state.photos.length; i++) {
            let path = this.state.photos[i];
            photos.push(<PhotoThumbnail src={path} caption={path}/>);
        }

        return (
            <div className="panel">
                {photos}
            </div>
        )
    }
});

export default Photos;
