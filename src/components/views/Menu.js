'use strict';

import React from 'react';
import {Link} from 'react-router';

const Menu = React.createClass({
    render() {
        return (
            <nav id="main-menu" className="bar">
                <ul>
                    <li><Link to="home" className="mega-octicon octicon-home" title="Home"></Link></li>
                    <li><Link to="videos" className="mega-octicon octicon-device-camera-video" title="Videos"></Link></li>
                    <li><Link to="photos" className="mega-octicon octicon-device-camera" title="Photos"></Link></li>
                    <li><Link to="settings" className="mega-octicon octicon-gear" title="Settings"></Link></li>
                </ul>
            </nav>
        )
    }
});

export default Menu;
