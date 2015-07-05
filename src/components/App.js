'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// Components
var Header = require('./views/Header');
var Menu = require('./views/Menu');

var App = React.createClass({
    render() {
        return (
            <div id='xiaomi-yi-app' className="grid rows split50">
                <Header/>
                <div className="content">
                    <div className="grid columns split50">
                        <Menu/>
                        <div id='route-handler' className="content">
                            <RouteHandler/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = App;
