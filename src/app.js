'use strict';

const remote = window.require('remote');

import React from 'react';
import Router from 'react-router';

const nconf = remote.require('nconf');

import CameraConnection from './xiaomi-yi/CameraConnection';

/**
 * Load configuration
 */
nconf.env();
nconf.argv();
nconf.file({ file: 'config/config.json' });
nconf.defaults({
    'ip': '192.168.42.1',
    'port': 7878
});

/**
 * Components
 */
const App = require('./components/App');
const Home = require('./components/views/Home');
const Videos = require('./components/views/Videos');
const Photos = require('./components/views/Photos');
const Settings = require('./components/views/Settings');

/**
 * Routes
 */
const Route = Router.Route;
const routes = (
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

// Start CameraConnection
CameraConnection.initialize({
    ip: nconf.get('ip'),
    port: nconf.get('port')
}).start();
