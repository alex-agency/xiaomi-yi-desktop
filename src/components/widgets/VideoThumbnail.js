'use strict';

var React = require('react');
var Link = require('react-router').Link;

var VideoThumbnail = React.createClass({
    render() {
        var randomRotation = Math.round((Math.random()*10)-5);
        var styles = {
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

module.exports = VideoThumbnail;
