import React from 'react';
import logo from '../../assets/logo.png'; // Correctly import the logo image

const Icon = ({ position = 'relative', top = '0', left = '0', width = '60px', height = '60px', mb = '0', mt = '0' }) => {
    return (
        <img
            src={logo}
            alt="Logo"
            style={{
                position: position,
                top: top,
                left: left,
                width: width,
                height: height,
                marginTop: mt,
                marginBottom: mb
            }}
        />
    );
};

export default Icon;
