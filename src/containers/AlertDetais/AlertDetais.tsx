import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteAlert, editAlert } from '../../actions/alertActions';
// import Button from '../../components/Button/Button';
import { CustomForm } from '../../components/CustomForm';
import { CurrencyInput } from '../../components/CustomForm/CurrencyInputPure';
import { TextInput } from '../../components/CustomForm/TextInputPure';
import { GridItem, GridWrapper } from '../../components/Grid';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import SpinnerButton from '../../components/SpinnerButton/SpinnerButton';
import dateFormatter from '../../helpers/dateFormatter';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';
import { RootState } from '../../store';
import { alertDetailsBackgroundColor, color1, colorSecondary22 } from '../../styles/colors';

const AlertDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 1; // the sidebar has fixed width
    height: 100%;
    width: 100%; // it's shrinking, so fill available space
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${alertDetailsBackgroundColor};
`;

const AlertTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    margin: 20px auto;

    span {
        font-size: 20px;
        font-weight: 800;
    }
`;

const PriceHistoryGraphArea = styled.div`
    width: 90%;
    margin: 0 auto;
    min-height: 0; // allowing tooltip to overflow
    flex-grow: 1;
`;

const AlertConfig = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px auto 50px;
    width: 70%;
`;

const LowestPrice = styled.div`
    margin: auto;
`;

// const Btn = styled(Button)`
//     width: 100%;
// `;

// TODO
const GridForm = styled(GridWrapper)`
    font-size: 0.9rem;

    label {
        align-self: center;
        margin-left: auto;
    }

    input {
        margin: 0 auto;
        padding: 5px;
        box-sizing: border-box;
        text-align: right;
        width: 90%;
        border: 0;
        border-radius: 0;
        background-color: hsl(234, 24%, 17%); // TODO
        color: #ccc;
    }

    // TODO
    .btn-ea {
        color: #fff; // TODO
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;

        &:active {
            position: relative;
            top: 1px;
        }
    }
`;

function AlertDetais(): ReactElement {
    const dispatch = useDispatch();
    const state = useSelector((store: RootState) => ({
        alert: store.alertReducer.selectedAlert,
        isLoading: store.alertReducer.selectedAlertLoading,
        isError: store.alertReducer.selectedAlertError,
        editLoading: store.alertReducer.alertEditLoading,
        deleteLoading: store.alertReducer.alertDeleteLoading,
    }));

    const onSubmit = (fields: any) => {
        if (!state.editLoading) {
            dispatch(editAlert(state.alert!.id, fields['ea-title'], +fields['ea-price']));
        }
    };

    const deleteBtnOnClick = () => {
        if (!state.deleteLoading) {
            dispatch(deleteAlert(state.alert!.id));
        }
    };

    // RENDERING
    const { alert, isLoading, isError, editLoading, deleteLoading } = state;
    if (isLoading) {
        return (
            <AlertDetailsWrapper>
                <div style={{ margin: 'auto' }}>Loading...</div>
            </AlertDetailsWrapper>
        );
    }
    if (isError) {
        return (
            <AlertDetailsWrapper>
                <div style={{ margin: 'auto' }}>Error</div>
            </AlertDetailsWrapper>
        );
    }
    if (!alert) {
        return (
            <AlertDetailsWrapper>
                <div style={{ margin: 'auto' }}>No alert selected</div>
            </AlertDetailsWrapper>
        );
    }
    const lowestPrice = alert.product.lowestPrice;
    return (
        <AlertDetailsWrapper>
            <AlertTitle>
                <span>{alert.title}</span>
                <a href={alert.product.url}>Buy now on Amazon</a>
            </AlertTitle>
            <PriceHistoryGraphArea>
                <PriceGraph
                    priceHistory={alert.product.priceHistory}
                    currency={alert.product.currency}
                />
            </PriceHistoryGraphArea>
            <AlertConfig>
                <LowestPrice>
                    <h2>
                        Lowest Price:{' '}
                        {normalizeCurrency(lowestPrice.price, alert.product.currency).formatted} in{' '}
                        {dateFormatter(new Date(+lowestPrice.date))}
                    </h2>
                </LowestPrice>
                <CustomForm className="form-edit-alert" onSubmit={onSubmit}>
                    {(formStateSetter: any) => (
                        <>
                            <GridForm
                                TemplateRows="1fr 0.5fr 1fr"
                                TemplateCols="auto 3fr 0.75fr"
                                width="100%"
                            >
                                <GridItem GridRow="1 / span 1" GridCol="1 / span 1">
                                    <label htmlFor="ea-title">Title: </label>
                                </GridItem>
                                <GridItem GridRow="1 / span 1" GridCol="2 / span 1">
                                    <TextInput
                                        type="text"
                                        id="ea-title"
                                        value={alert.title}
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="3 / span 1" GridCol="1 / span 1">
                                    <label htmlFor="ea-price">Target price: </label>
                                </GridItem>
                                <GridItem GridRow="3 / span 1" GridCol="2 / span 1">
                                    <CurrencyInput
                                        id="ea-price"
                                        name="price"
                                        currency={alert.product.currency}
                                        value={
                                            normalizeCurrency(
                                                alert.targetPrice,
                                                alert.product.currency
                                            ).formatted
                                        }
                                        formStateSetter={formStateSetter}
                                    />
                                </GridItem>
                                <GridItem GridRow="1 / span 1" GridCol="3 / span 1">
                                    {/* <Btn bgColor={color1} type="submit">
                                        Edit
                                    </Btn> */}
                                    <SpinnerButton
                                        bgColor={color1}
                                        style={{
                                            width: '100%',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                        }}
                                        type="submit"
                                        loading={editLoading}
                                        text="Edit"
                                    />
                                </GridItem>
                                <GridItem GridRow="3 / span 1" GridCol="3 / span 1">
                                    {/* <Btn
                                        type="button"
                                        bgColor={colorSecondary22}
                                        onClick={deleteBtnOnClick}
                                    >
                                        Delete
                                    </Btn> */}
                                    <SpinnerButton
                                        bgColor={colorSecondary22}
                                        style={{
                                            width: '100%',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                        }}
                                        type="button"
                                        loading={deleteLoading}
                                        onClick={deleteBtnOnClick}
                                        text="Delete"
                                    />
                                </GridItem>
                            </GridForm>
                        </>
                    )}
                </CustomForm>
            </AlertConfig>
        </AlertDetailsWrapper>
    );
}

export default AlertDetais;
