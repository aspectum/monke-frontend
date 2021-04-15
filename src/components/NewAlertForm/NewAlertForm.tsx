import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createNewAlert } from '../../actions/alertActions';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';
import { validateAmazonURL } from '../../validators/amazonURLValidator';
import { ButtonSubmit, CustomForm } from '../CustomForm';
import { CurrencyInput } from '../CustomForm/CurrencyInputPure';
import { TextInput } from '../CustomForm/TextInputPure';
import { GridItem, GridWrapper } from '../Grid';
import SpinnerButton from '../SpinnerButton/SpinnerButton';
import Tooltip from '../Tooltip/Tooltip';

// TODO
const GridForm = styled(GridWrapper)`
    label {
        align-self: center;
    }

    input {
        width: 100%;
        border: 0;
        padding: 5px;
        box-sizing: border-box;
    }

    .btn-add-alert {
        margin: 0 auto;

        width: 50%;
        color: #fff; // TODO: use variable
        font-size: 20px;
        padding: 10px 0;
        border: none;
        border-radius: 10px;
        background-color: $color-secondary-1-2;
        transition: background-color ease-in-out 0.2s;

        &:hover {
            background-color: lighten($color-secondary-1-2, $button-lighten-ammount);
        }

        &:active {
            position: relative;
            top: 1px;
        }
    }
`;

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
            <CustomForm onSubmit={onSubmit}>
                {(formStateSetter: any) => (
                    <>
                        <GridForm
                            TemplateRows="2em 2em 30px 2em 2em 50px auto"
                            TemplateCols="1fr 0"
                            width="100%"
                        >
                            <GridItem GridRow="1 / span 1">
                                <label htmlFor="na-url">Amazon URL: </label>
                            </GridItem>
                            <GridItem GridRow="2 / span 1">
                                <TextInput
                                    type="text"
                                    id="na-url"
                                    formStateSetter={formStateSetter}
                                />
                            </GridItem>
                            <GridItem GridRow="2 / span 1">
                                <Tooltip
                                    visible={!validURL}
                                    text="Invalid URL. Are you sure you put an Amazon store link?"
                                    id="na-url-tooltip"
                                />
                            </GridItem>
                            <GridItem GridRow="4 / span 1">
                                <label htmlFor="na-url">Target Price: </label>
                            </GridItem>
                            <GridItem GridRow="5 / span 1">
                                <CurrencyInput
                                    id="na-price"
                                    name="price"
                                    currency="USD"
                                    value={normalizeCurrency('0.00').formatted}
                                    formStateSetter={formStateSetter}
                                />
                            </GridItem>
                            <GridItem GridRow="7 / span 1">
                                <ButtonSubmit className="btn-add-alert" text="Add Alert" />
                            </GridItem>
                        </GridForm>
                    </>
                )}
            </CustomForm>
            <SpinnerButton loading text="lala" />
        </>
    );
}

export default NewAlertForm;

// return (
//     <>
//         <CustomForm className="form-new-alert" onSubmit={onSubmit}>
//             {(formStateSetter: any) => (
//                 <>
//                     <TextInput
//                         type="text"
//                         id="na-url"
//                         label="Amazon URL:"
//                         formStateSetter={formStateSetter}
//                     />
//                     <Tooltip
//                         visible={!validURL}
//                         text="Invalid URL. Are you sure you put an Amazon store link?"
//                         id="na-url-tooltip"
//                     />
//                     <CurrencyInput
//                         id="na-price"
//                         label="Target Price: "
//                         name="price"
//                         currency="USD"
//                         value={normalizeCurrency('0.00').formatted}
//                         formStateSetter={formStateSetter}
//                     />
//                     <ButtonSubmit className="btn-add-alert" text="Add Alert" />
//                 </>
//             )}
//         </CustomForm>
//         <SpinnerButton loading text="lala" />
//     </>
// );
