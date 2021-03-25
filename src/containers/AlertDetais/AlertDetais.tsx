import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ButtonSubmit from '../../components/CustomForm/ButtonSubmit';
import CustomForm from '../../components/CustomForm/CustomForm';
import TextInput from '../../components/CustomForm/TextInput';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import dateFormatter from '../../helpers/dateFormatter';
import { RootState } from '../../store';
import './AlertDetais.scss';

function AlertDetais(): ReactElement {
    const state = useSelector((store: RootState) => ({
        alert: store.alertReducer.selectedAlert,
        isLoading: store.alertReducer.selectedAlertLoading,
        isError: store.alertReducer.selectedAlertError,
    }));

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
                <CustomForm className="form-edit-alert" onSubmit={(fields) => console.log(fields)}>
                    <TextInput id="ea-title" label="Title: " value={alert.product.title} />
                    <TextInput
                        id="ea-price"
                        label="Target price: "
                        value={alert.targetPrice.toString()}
                    />
                    <ButtonSubmit className="btn-ea btn-edit-alert" text="Edit" />
                    <ButtonSubmit className="btn-ea btn-delete-alert" text="Delete" />
                </CustomForm>
            </div>
        </div>
    );
}

export default AlertDetais;
