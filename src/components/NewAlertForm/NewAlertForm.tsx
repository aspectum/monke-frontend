import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewAlert } from '../../actions/alertActions';
import { validateAmazonURL } from '../../validators/amazonURLValidator';
import { ButtonSubmit, CurrencyInput, CustomForm, TextInput } from '../CustomForm';
import Tooltip from '../Tooltip/Tooltip';
import './NewAlertForm.scss';

function NewAlertForm() {
    const [validURL, setState] = useState(true);
    const dispatch = useDispatch();

    const onSubmit = (fields: any) => {
        const isValid = validateAmazonURL(fields['na-url']);
        setState(isValid);
        if (isValid) {
            dispatch(createNewAlert(fields['na-url'], +fields['na-price']));
        }
    };

    return (
        <>
            <CustomForm className="form-new-alert" onSubmit={onSubmit}>
                {(formStateSetter: any) => (
                    <>
                        <TextInput
                            type="text"
                            id="na-url"
                            label="Amazon URL:"
                            formStateSetter={formStateSetter}
                        />
                        <Tooltip
                            visible={!validURL}
                            text="Invalid URL. Are you sure you put an Amazon store link?"
                            id="na-url-tooltip"
                        />
                        <CurrencyInput
                            id="na-price"
                            label="Target Price: "
                            name="price"
                            currency="USD"
                            formStateSetter={formStateSetter}
                        />
                        <ButtonSubmit className="btn-add-alert" text="Add Alert" />
                    </>
                )}
            </CustomForm>
        </>
    );
}

export default NewAlertForm;
