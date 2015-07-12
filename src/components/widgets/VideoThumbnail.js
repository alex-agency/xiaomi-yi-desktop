import React from 'react';
import {Link} from 'react-router';

const VideoThumbnail = React.createClass({
    render() {
        let randomRotation = Math.round((Math.random()*10)-5);
        let styles = {
            transform: 'rotateZ('+randomRotation+'deg)'
        }
        return (
            <Link to="home" className="video-thumbnail" style={styles}>
                <div className="overlay"></div>
                <div className="thumbnail-container">
                    <img className="thumbnail" src={this.props.src}/>
                    <span className="caption">{this.props.caption}</span>
                </div>
            </Link>
        )
    }
});

export default VideoThumbnail;
