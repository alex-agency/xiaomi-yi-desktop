import React from 'react';
import {Link} from 'react-router';

const PhotoThumbnail = React.createClass({
    render() {
        let randomRotation = Math.round((Math.random()*10)-5);
        let styles = {
            transform: 'rotateZ('+randomRotation+'deg)'
        }
        return (
            <Link to="home" className="photo-thumbnail" style={styles}>
                <img className="thumbnail" src={this.props.src}/>
                <div className="caption">{this.props.caption}</div>
            </Link>
        )
    }
});

export default PhotoThumbnail;
