import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { showNewAlertModal } from '../../actions/modalActions';
import './NewAlertButton.scss';

function NewAlertButton(): ReactElement {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(showNewAlertModal());
    };

    return (
        <button className="btn-new-alert" type="button" onClick={onClick}>
            + Add new alert
        </button>
    );
}

export default NewAlertButton;
