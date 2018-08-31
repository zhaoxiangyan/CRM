import React from 'react';
import PropTypes from 'prop-types';
import './iconfont';

const Custom = ({type}) => {
    const useTag = `<use xlink:href=${'#icon-' + type} />`;
    return (
        <i className="custom">
            <svg className="custom" dangerouslySetInnerHTML={{__html: useTag }} />
            <style>{`
            .custom {
                display: inline-block;
                overflow: hidden;
            }
            .custom svg {
                width: 3em;
                height: 3em;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }
        `}</style>
        </i>

    );
};

Custom.propTypes = {
    type: PropTypes.string.isRequired
};

export default Custom;