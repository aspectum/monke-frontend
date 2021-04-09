import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchAlertDetails, fetchAllAlerts } from '../../actions/alertActions';
import { AlertData } from '../../actions/alertActionTypes';
import AlertCard from '../../components/AlertCard/AlertCard';
import CustomScrollbar from '../../components/CustomScrollbar/CustomScrollbar';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';
import { RootState } from '../../store';

const AlertListWrapper = styled.div`
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: 2;
`;

interface Props {
    alerts: AlertData[];
    selectedAlert?: AlertData;
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
        this.props.fetchAllAlerts();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props !== prevProps) {
            if (this.props.selectedAlert) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ selectedAlertId: this.props.selectedAlert.id });
            }
        }
    }

    onClick = (alertId: string) => () => {
        this.setState({ selectedAlertId: alertId });
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
        if (!alerts[0]) {
            return (
                <div className="alert-list">
                    <div style={{ margin: 'auto' }}>No alerts</div>
                </div>
            );
        }
        return (
            <AlertListWrapper>
                <CustomScrollbar>
                    {alerts!.map((alert) => (
                        <AlertCard
                            active={selectedAlertId === alert.id}
                            onClick={this.onClick(alert.id)}
                            key={alert.id}
                            title={alert.title}
                            targetPrice={
                                normalizeCurrency(alert.targetPrice, alert.product.currency)
                                    .formatted
                            }
                            imageUrl={alert.product.imageUrl}
                        />
                    ))}
                </CustomScrollbar>
            </AlertListWrapper>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    alerts: state.alertReducer.userAlerts,
    selectedAlert: state.alertReducer.selectedAlert,
    isLoading: state.alertReducer.userAlertsLoading,
    isError: state.alertReducer.userAlertsError,
});

const mapDispatchToProps = {
    fetchAllAlerts,
    fetchAlertDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertList);
