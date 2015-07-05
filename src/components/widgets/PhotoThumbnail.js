'use strict';

var React = require('react');
var Link = require('react-router').Link;

var PhotoThumbnail = React.createClass({
    render() {
        var randomRotation = Math.round((Math.random()*10)-5);
        var styles = {
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

module.exports = PhotoThumbnail;
