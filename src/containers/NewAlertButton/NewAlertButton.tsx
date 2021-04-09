import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { showNewAlertModal } from '../../actions/modalActions';
import Button from '../../components/Button/Button';
import { colorSecondary12 } from '../../styles/colors';

const NewAlertButtonWrapper = styled.div`
    position: absolute;
    bottom: 100%; // putting it above container
    width: 100%;
`;

const NewAlertButtonComponent = styled(Button)`
    padding: 10px 0;
    border-radius: 10px;
    font-size: 20px;
    width: 100%;
`;

function NewAlertButton(): ReactElement {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(showNewAlertModal());
    };

    return (
        <NewAlertButtonWrapper>
            <NewAlertButtonComponent bgColor={colorSecondary12} onClick={onClick}>
                + Add new alert
            </NewAlertButtonComponent>
        </NewAlertButtonWrapper>
    );
}

export default NewAlertButton;
