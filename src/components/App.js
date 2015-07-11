'use strict';

import React from 'react';
import Router from 'react-router';

const RouteHandler = Router.RouteHandler;

// Components
import Header from './views/Header';
import Menu from './views/Menu';
import ConnectionError from './views/ConnectionError';

const App = React.createClass({
    render() {
        return (
            <div id='xiaomi-yi-app' className="grid rows split50">
                <Header/>
                <div className="content">
                    <ConnectionError/>
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

export default App;
