import { desaturate } from 'polished';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { buttonDesaturateAmount } from '../../styles/colors';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
// import './SpinnerButton.scss';

const SpinnerButtonDefault = styled(Button)`
    width: 50%;
    padding: 10px 0;
    border-radius: 10px;
`;

const SpinnerButtonLoading = styled(SpinnerButtonDefault)`
    cursor: wait;
    background-color: ${({ bgColor }) => desaturate(buttonDesaturateAmount, bgColor)};

    &:hover,
    &:active {
        position: unset;
        top: unset;
        background-color: ${({ bgColor }) => desaturate(buttonDesaturateAmount, bgColor)};
    }
`;

interface Props {
    text: string;
    loading: boolean;
    bgColor: string;
    style?: React.CSSProperties;
    onClick?: (args: any) => any;
    type?: 'button' | 'submit' | 'reset';
}

function SpinnerButton({
    text,
    loading,
    onClick,
    type = 'button',
    bgColor,
    style,
}: Props): ReactElement {
    if (loading) {
        return (
            <SpinnerButtonLoading
                style={style}
                type={type}
                bgColor={bgColor}
                onClick={onClick || (() => {})}
            >
                <Spinner type="ThreeDots" width={60} height={10} />
            </SpinnerButtonLoading>
        );
    }
    return (
        <SpinnerButtonDefault
            style={style}
            type={type}
            bgColor={bgColor}
            onClick={onClick || (() => {})}
        >
            {text}
        </SpinnerButtonDefault>
    );
}

export default SpinnerButton;
