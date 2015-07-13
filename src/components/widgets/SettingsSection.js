import React from 'react';

const SettingsSection = React.createClass({
    render() {
        return (
            <section>
                <div className="section-name">{this.props.name}</div>
                {this.props.children}
            </section>
        )
    }
});

export default SettingsSection;
