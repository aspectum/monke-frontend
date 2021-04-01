import React, { ReactElement } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { thumbStyle, trackStyle } from './CustomScrollbar.style';

interface Props {
    children: React.ReactNode;
}

function CustomScrollbar({ children }: Props): ReactElement {
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
}

export default CustomScrollbar;
