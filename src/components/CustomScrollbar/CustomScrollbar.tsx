import React, { ReactElement } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { color1 } from '../../styles/colors';

const trackStyle: React.CSSProperties = {
    backgroundColor: '#000',
    position: 'absolute',
    right: '244px',
};

const thumbStyle: React.CSSProperties = {
    backgroundColor: color1,
};

interface Props {
    children: React.ReactNode;
}

export default ({ children }: Props): ReactElement => {
    const renderTrack = ({ style, ...props }: any) => {
        // track needs this style
        const necessaryStyle = {
            height: '100%',
            top: '0',
            right: '0',
        };
        return <div style={{ ...style, ...necessaryStyle, ...trackStyle }} {...props} />;
    };

    const renderThumb = ({ style, ...props }: any) => {
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };

    return (
        <Scrollbars renderTrackVertical={renderTrack} renderThumbVertical={renderThumb}>
            {children}
        </Scrollbars>
    );
};
