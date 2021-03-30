/* eslint-disable react/require-default-props */
import React, { ReactElement } from 'react';
import './Tooltip.scss';

interface Props {
    text: string;
    id: string;
    visible?: boolean;
}

function Tooltip({ text, id, visible }: Props): ReactElement {
    return (
        <div className={`tooltip ${visible ? 'visible' : ''}`} id={id}>
            {text}
        </div>
    );
}

export default Tooltip;
