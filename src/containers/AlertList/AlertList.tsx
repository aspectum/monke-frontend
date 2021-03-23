import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlertDetails, fetchAllAlerts } from '../../actions/alertActions';
import { AlertData } from '../../actions/alertActionTypes';
import AlertCard from '../../components/AlertCard/AlertCard';
import { RootState } from '../../store';
import './AlertList.scss';

interface Props {
    alerts: AlertData[] | undefined;
    isLoading: boolean;
    isError: boolean;
    fetchAllAlerts: () => void;
    fetchAlertDetails: (id: string) => void;
}
interface State {
    selectedAlertId: string | undefined;
}

class AlertList extends Component<Props, State> {
    state: State = {
        selectedAlertId: undefined,
    };

    componentDidMount() {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.fetchAllAlerts();
    }

    onClick = (alertId: string) => () => {
        this.setState({ selectedAlertId: alertId });
        // eslint-disable-next-line react/destructuring-assignment
        this.props.fetchAlertDetails(alertId);
    };

    render() {
        const { alerts, isLoading, isError } = this.props;
        const { selectedAlertId } = this.state;
        // TODO: proper loading and error handling
        if (isLoading) {
            return (
                <div className="alert-list">
                    <div style={{ margin: 'auto' }}>Loading</div>
                </div>
            );
        }
        if (isError) {
            return (
                <div className="alert-list">
                    <div style={{ margin: 'auto' }}>Error</div>
                </div>
            );
        }
        if (!alerts) {
            return (
                <div className="alert-list">
                    <div style={{ margin: 'auto' }}>No alerts</div>
                </div>
            );
        }
        return (
            <div className="alert-list">
                {alerts!.map((alert) => (
                    <AlertCard
                        active={selectedAlertId === alert.id}
                        onClick={this.onClick(alert.id)}
                        key={alert.id}
                        title={alert.product.title}
                        targetPrice={alert.targetPrice}
                        imageUrl={alert.product.imageUrl}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    alerts: state.alertReducer.userAlerts,
    isLoading: state.alertReducer.userAlertsLoading,
    isError: state.alertReducer.userAlertsError,
});

const mapDispatchToProps = {
    fetchAllAlerts,
    fetchAlertDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertList);
