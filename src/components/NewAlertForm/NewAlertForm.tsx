import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { createNewAlert } from '../../actions/alertActions';
import { ButtonSubmit, CurrencyInput, CustomForm, TextInput } from '../CustomForm';
import './NewAlertForm.scss';

function NewAlertForm(): ReactElement {
    const dispatch = useDispatch();

    const onSubmit = (fields: any) => {
        dispatch(createNewAlert(fields['na-url'], +fields['na-price']));
    };

    return (
        <CustomForm className="form-new-alert" onSubmit={onSubmit}>
            <TextInput type="text" id="na-url" label="Amazon URL:" />
            {/* <TextInput type="text" id="na-price" label="Target Price:" /> */}
            <CurrencyInput id="na-price" label="Target Price: " name="price" currency="USD" />
            <ButtonSubmit className="btn-add-alert" text="Add Alert" />
        </CustomForm>
    );
}

export default NewAlertForm;
