import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlertDetailedData } from '../../actions/alertActionTypes';
import ButtonSubmit from '../../components/CustomForm/ButtonSubmit';
import CustomForm from '../../components/CustomForm/CustomForm';
import TextInput from '../../components/CustomForm/TextInput';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import dateFormatter from '../../helpers/dateFormatter';
import { RootState } from '../../store';
import './AlertDetais.scss';

interface Props {
    alert: AlertDetailedData;
    isLoading: boolean;
    isError: boolean;
}

// Inputs
interface State {
    title: string;
    price: string;
}

class AlertDetais extends Component<Props, State> {
    state = {
        title: '',
        price: '',
    };

    // componentDidMount() {
    //     if (this.props.alert) {
    //         this.setState({
    //             title: this.props.alert.product.title,
    //             price: this.props.alert.targetPrice.toString(),
    //         });
    //     }
    // }

    componentDidUpdate(prevProps: Props) {
        if (this.props.alert !== prevProps.alert) {
            if (this.props.alert) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    title: this.props.alert.product.title,
                    price: this.props.alert.targetPrice.toString(),
                });
            }
        }
    }

    onSubmit = () => {
        console.log('absolutely nothing');
    };

    // Updates the state with the inputs
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as any);
    };

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
                        {/* // TODO: Put actual lowest price and parse correctly values */}
                        <h2>
                            Lowest Price: $ {lowestPrice.price} in{' '}
                            {dateFormatter(new Date(+lowestPrice.date))}
                        </h2>
                    </div>
                    <CustomForm>
                        <TextInput id="inpt" label="Input for test" value="valor" />
                        <ButtonSubmit text="Button" />
                    </CustomForm>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-edit-alert">
                            <label htmlFor="ea-title" id="ea-title-label">
                                Title:{' '}
                            </label>
                            <input
                                type="text"
                                id="ea-title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                            <label htmlFor="ea-price" id="ea-price-label">
                                Target price:{' '}
                            </label>
                            <input
                                type="text"
                                id="ea-price"
                                name="price"
                                value={this.state.price}
                                onChange={this.onChange}
                            />
                            <button type="submit">Confirm</button>
                            <button type="button">Delete</button>
                        </div>
                    </form>
                    {/* <form>
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
                    </form> */}
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
