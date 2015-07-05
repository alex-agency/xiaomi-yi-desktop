'use strict';

var React = require('react');
var Router = require('react-router');

/**
 * Components
 */
var App = require('./components/App');
var Home = require('./components/views/Home');
var Videos = require('./components/views/Videos');
var Photos = require('./components/views/Photos');
var Settings = require('./components/views/Settings');

/**
 * Routes
 */
var Route = Router.Route;
var routes = (
    <Route handler={App}>
        <Router.DefaultRoute name="home" handler={Home}/>
        <Route name="videos" handler={Videos}/>
        <Route name="photos" handler={Photos}/>
        <Route name="settings" handler={Settings}/>
    </Route>
);

Router.run(routes, Router.HashLocation, function(Root){
    React.render(<Root/>, document.body);
});
