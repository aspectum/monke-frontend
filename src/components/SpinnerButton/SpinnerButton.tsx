import { desaturate } from 'polished';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { buttonDesaturateAmount, colorSecondary12 } from '../../styles/colors';
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
}

function SpinnerButton({ text, loading }: Props): ReactElement {
    const [state, setstate] = useState(loading);
    if (state) {
        return (
            <SpinnerButtonLoading bgColor={colorSecondary12} onClick={() => setstate(!state)}>
                <Spinner type="ThreeDots" width={60} height={10} />
            </SpinnerButtonLoading>
        );
    }
    return (
        <SpinnerButtonDefault bgColor={colorSecondary12} onClick={() => setstate(!state)}>
            {text}
        </SpinnerButtonDefault>
    );
}

export default SpinnerButton;
