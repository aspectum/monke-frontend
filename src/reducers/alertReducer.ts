import {
    AlertData,
    AlertDetailedData,
    AlertDispatchTypes,
    ALERT_ALL_LOADING,
    ALERT_DETAILS_LOADING,
    ALERT_ALL_FAILURE,
    ALERT_DETAILS_FAILURE,
    ALERT_ALL_SUCCESS,
    ALERT_DETAILS_SUCCESS,
} from '../actions/alertActionTypes';

interface AlertState {
    userAlerts?: AlertData[];
    selectedAlert?: AlertDetailedData;
    userAlertsLoading: boolean;
    selectedAlertLoading: boolean;
    userAlertsError: boolean;
    selectedAlertError: boolean;
}

const initialState: AlertState = {
    userAlerts: undefined,
    selectedAlert: undefined,
    userAlertsLoading: true,
    selectedAlertLoading: false,
    userAlertsError: false,
    selectedAlertError: false,
};

export default (state = initialState, action: AlertDispatchTypes) => {
    switch (action.type) {
        case ALERT_ALL_LOADING:
            return {
                ...state,
                userAlertsLoading: true,
                userAlertsError: false,
            };
        case ALERT_DETAILS_LOADING:
            return {
                ...state,
                selectedAlertLoading: true,
                selectedAlertError: false,
            };
        case ALERT_ALL_FAILURE:
            return {
                ...state,
                userAlerts: undefined,
                userAlertsLoading: false,
                userAlertsError: true,
            };
        case ALERT_DETAILS_FAILURE:
            return {
                ...state,
                selectedAlert: undefined,
                selectedAlertLoading: false,
                selectedAlertError: true,
            };
        case ALERT_ALL_SUCCESS:
            return {
                ...state,
                userAlerts: action.payload,
                userAlertsLoading: false,
                userAlertsError: false,
            };
        case ALERT_DETAILS_SUCCESS:
            return {
                ...state,
                selectedAlert: action.payload,
                selectedAlertLoading: false,
                selectedAlertError: false,
            };
        default:
            return state;
    }
};
