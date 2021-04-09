import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { tooltipBackgroundColor, tooltipTextColor } from '../../styles/colors';

interface TooltipComponentProps {
    visible: boolean;
}

const TooltipComponent = styled.div<TooltipComponentProps>`
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    text-align: center;
    width: 160px;
    height: fit-content;
    background-color: ${tooltipBackgroundColor};
    color: ${tooltipTextColor};
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text */
    position: relative;
    z-index: 1;
    top: 50%; // aligning with input
    transform: translate(0, -50%);
    margin-left: 5px; // space for arrow

    /* Fade in tooltip */
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity 0.3s;

    /* Tooltip arrow */
    &::after {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent ${tooltipBackgroundColor} transparent transparent;
    }
`;

interface Props {
    text: string;
    id: string;
    visible?: boolean;
}

const Tooltip = ({ text, id, visible = false }: Props): ReactElement => {
    return (
        <TooltipComponent visible={visible} id={id}>
            {text}
        </TooltipComponent>
    );
};

export default Tooltip;
