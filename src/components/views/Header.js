'use strict';

var React = require('react');

// Components
var Status = require('./../widgets/Status');

var Header = React.createClass({
    render() {
        return (
            <header id="main-header" className="bar">
                <h1><span className="logo"></span> Xiaomi Yi Desktop</h1>
                <Status/>
            </header>
        )
    }
});

module.exports = Header;
