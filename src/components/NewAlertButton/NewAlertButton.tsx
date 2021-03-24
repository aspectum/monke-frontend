import React, { ReactElement } from 'react';
import './NewAlertButton.scss';

function NewAlertButton(): ReactElement {
    return (
        <button className="btn-new-alert" type="button">
            + Add new alert
        </button>
    );
}

export default NewAlertButton;
