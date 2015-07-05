'use strict';

var React = require('react');

var VideoPlayer = React.createClass({
    render() {
        return (
            <div className="video-player-widget">
                <video className="video-js vjs-default-skin" controls preload="auto" width="100%" height="100%" data-setup='{}'>
                    <source src={this.props.url} type={this.props.type}></source>
                </video>
            </div>
        )
    }
});

module.exports = VideoPlayer;
