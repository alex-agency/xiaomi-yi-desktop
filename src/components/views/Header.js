import React from 'react';

// Components
import Status from './../widgets/Status';

const Header = React.createClass({
    render() {
        return (
            <header id="main-header" className="bar">
                <h1><span className="logo"></span> Xiaomi Yi Desktop</h1>
                <Status/>
            </header>
        )
    }
});

export default Header;
