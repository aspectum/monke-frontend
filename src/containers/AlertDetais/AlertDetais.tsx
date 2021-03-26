import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert, editAlert } from '../../actions/alertActions';
import { ButtonSubmit, CustomForm, TextInput } from '../../components/CustomForm';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import dateFormatter from '../../helpers/dateFormatter';
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
        dispatch(editAlert(state.alert!.id, +fields['ea-price']));
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
    const lowestPrice = alert.product.priceHistory[0];
    return (
        <div className="alert-details">
            <div className="price-history-graph">
                <PriceGraph priceHistory={alert.product.priceHistory} />
            </div>
            <div className="alert-config">
                <div className="lowest-price">
                    {/* // TODO: Put actual lowest price and parse correctly values */}
                    <h2>
                        Lowest Price: $ {lowestPrice.price} in{' '}
                        {dateFormatter(new Date(+lowestPrice.date))}
                    </h2>
                </div>
                <CustomForm className="form-edit-alert" onSubmit={onSubmit}>
                    <TextInput
                        type="text"
                        id="ea-title"
                        label="Title: "
                        value={alert.product.title}
                    />
                    <TextInput
                        id="ea-price"
                        type="text"
                        label="Target price: "
                        value={alert.targetPrice.toString()}
                    />
                    <ButtonSubmit className="btn-ea btn-edit-alert" text="Edit" />
                    <button
                        className="btn-ea btn-delete-alert"
                        type="button"
                        onClick={deleteBtnOnClick}
                    >
                        Delete
                    </button>
                </CustomForm>
            </div>
        </div>
    );
}

export default AlertDetais;
