import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlertDetailedData } from '../../actions/alertActionTypes';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import { RootState } from '../../store';
import './AlertDetais.scss';

interface Props {
    alert: AlertDetailedData;
    isLoading: boolean;
    isError: boolean;
}

// Inputs
interface State {}

class AlertDetais extends Component<Props, State> {
    state = {};

    render() {
        const { alert, isLoading, isError } = this.props;
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
                        {/* Put actual lowest price and parse correctly values */}
                        <h2>
                            Lowest Price: $ {lowestPrice.price} in {lowestPrice.date}
                        </h2>
                    </div>
                    <form>
                        <div className="alert-form-table">
                            <div className="row">
                                <div className="col labels">
                                    <div className="row title">
                                        <label htmlFor="title">Title: </label>
                                    </div>
                                    <div className="row price">
                                        <label htmlFor="price">Target price: </label>
                                    </div>
                                </div>
                                <div className="col inputs">
                                    <div className="row title">
                                        <input type="text" id="title" value={alert.product.title} />
                                    </div>
                                    <div className="row price">
                                        <input
                                            type="text"
                                            id="price"
                                            value={`$ ${alert.targetPrice}`}
                                        />
                                    </div>
                                </div>
                                <div className="col button">
                                    <div className="submit">
                                        <button type="submit">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    alert: state.alertReducer.selectedAlert,
    isLoading: state.alertReducer.selectedAlertLoading,
    isError: state.alertReducer.selectedAlertError,
});

export default connect(mapStateToProps, null)(AlertDetais);
