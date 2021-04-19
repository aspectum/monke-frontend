import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createNewAlert } from '../../actions/alertActions';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';
import { RootState } from '../../store';
import { colorSecondary12 } from '../../styles/colors';
import { validateAmazonURL } from '../../validators/amazonURLValidator';
import { CustomForm } from '../CustomForm';
import { CurrencyInput } from '../CustomForm/CurrencyInputPure';
import { TextInput } from '../CustomForm/TextInputPure';
import { GridItem, GridWrapper } from '../Grid';
import SpinnerButton from '../SpinnerButton/SpinnerButton';
import Tooltip from '../Tooltip/Tooltip';

// TODO
const GridForm = styled(GridWrapper)`
    font-size: 1.5rem;
`;

function NewAlertForm() {
    const [validURL, setState] = useState(true);
    const loading = useSelector((state: RootState) => state.alertReducer.alertCreateLoading);
    const dispatch = useDispatch();

    const onSubmit = (fields: any) => {
        if (!loading) {
            const isValid = validateAmazonURL(fields['na-url']);
            setState(isValid);
            if (isValid) {
                dispatch(createNewAlert(fields['na-url'], +fields['na-price']));
            }
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
                                <SpinnerButton
                                    bgColor={colorSecondary12}
                                    type="submit"
                                    loading={loading}
                                    text="Add Alert"
                                />
                            </GridItem>
                        </GridForm>
                    </>
                )}
            </CustomForm>
        </>
    );
}

export default NewAlertForm;
