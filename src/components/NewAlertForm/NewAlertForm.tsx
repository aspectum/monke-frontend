import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { createNewAlert } from '../../actions/alertActions';
import ButtonSubmit from '../CustomForm/ButtonSubmit';
import CustomForm from '../CustomForm/CustomForm';
import TextInput from '../CustomForm/TextInput';
import './NewAlertForm.scss';

function NewAlertForm(): ReactElement {
    const dispatch = useDispatch();

    const onSubmit = (fields: any) => {
        dispatch(createNewAlert(fields['na-url'], +fields['na-price']));
    };

    return (
        <CustomForm className="form-new-alert" onSubmit={onSubmit}>
            <TextInput id="na-url" label="Amazon URL:" />
            <TextInput id="na-price" label="Target Price:" />
            <ButtonSubmit className="btn-add-alert" text="Add Alert" />
        </CustomForm>
    );
}

export default NewAlertForm;
