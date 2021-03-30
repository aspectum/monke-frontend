import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert, editAlert } from '../../actions/alertActions';
import { ButtonSubmit, CurrencyInput, CustomForm, TextInput } from '../../components/CustomForm';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import dateFormatter from '../../helpers/dateFormatter';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';
import { RootState } from '../../store';
import './AlertDetais.scss';

function AlertDetais(): ReactElement {
    const dispatch = useDispatch();
    const state = useSelector((store: RootState) => ({
        alert: store.alertReducer.selectedAlert,
        isLoading: store.alertReducer.selectedAlertLoading,
        isError: store.alertReducer.selectedAlertError,
    }));

    const onSubmit = (fields: any) => {
        dispatch(editAlert(state.alert!.id, fields['ea-title'], +fields['ea-price']));
    };

    const deleteBtnOnClick = () => {
        dispatch(deleteAlert(state.alert!.id));
    };

    // RENDERING
    const { alert, isLoading, isError } = state;
    if (isLoading) {
        return (
            <div className="alert-details">
                <div style={{ margin: 'auto' }}>Loading</div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="alert-details">
                <div style={{ margin: 'auto' }}>Error</div>
            </div>
        );
    }
    if (!alert) {
        return (
            <div className="alert-details">
                <div style={{ margin: 'auto' }}>No alert selected</div>
            </div>
        );
    }
    const lowestPrice = alert.product.lowestPrice;
    return (
        <div className="alert-details">
            <div className="alert-title">
                <span className="title">{alert.title}</span>
                <a href={alert.product.url}>Buy now on Amazon</a>
            </div>
            <div className="price-history-graph">
                <PriceGraph
                    priceHistory={alert.product.priceHistory}
                    currency={alert.product.currency}
                />
            </div>
            <div className="alert-config">
                <div className="lowest-price">
                    {/* // TODO: Put actual lowest price and parse correctly values */}
                    <h2>
                        Lowest Price:{' '}
                        {normalizeCurrency(lowestPrice.price, alert.product.currency).formatted} in{' '}
                        {dateFormatter(new Date(+lowestPrice.date))}
                    </h2>
                </div>
                <CustomForm className="form-edit-alert" onSubmit={onSubmit}>
                    {(formStateSetter: any) => (
                        <>
                            <TextInput
                                type="text"
                                id="ea-title"
                                label="Title: "
                                value={alert.title}
                                formStateSetter={formStateSetter}
                            />
                            <CurrencyInput
                                id="ea-price"
                                label="Target price: "
                                name="price"
                                currency={alert.product.currency}
                                value={
                                    normalizeCurrency(alert.targetPrice, alert.product.currency)
                                        .formatted
                                }
                                formStateSetter={formStateSetter}
                            />
                            <ButtonSubmit className="btn-ea btn-edit-alert" text="Edit" />
                            <button
                                className="btn-ea btn-delete-alert"
                                type="button"
                                onClick={deleteBtnOnClick}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </CustomForm>
            </div>
        </div>
    );
}

export default AlertDetais;
