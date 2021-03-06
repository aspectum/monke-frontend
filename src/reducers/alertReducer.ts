import {
    AlertData,
    AlertDetailedData,
    AlertDispatchTypes,
    ALERT_ALL_FAILURE,
    ALERT_ALL_LOADING,
    ALERT_ALL_SUCCESS,
    ALERT_CREATE_FAILURE,
    ALERT_CREATE_LOADING,
    ALERT_CREATE_SUCCESS,
    ALERT_DELETE_FAILURE,
    ALERT_DELETE_LOADING,
    ALERT_DELETE_SUCCESS,
    ALERT_DETAILS_FAILURE,
    ALERT_DETAILS_LOADING,
    ALERT_DETAILS_SUCCESS,
    ALERT_EDIT_FAILURE,
    ALERT_EDIT_LOADING,
    ALERT_EDIT_SUCCESS,
} from '../actions/alertActionTypes';

interface AlertState {
    userAlerts: AlertData[];
    selectedAlert?: AlertDetailedData;
    userAlertsLoading: boolean;
    selectedAlertLoading: boolean;
    userAlertsError: boolean;
    selectedAlertError: boolean;
    alertCreateLoading: boolean;
    alertEditLoading: boolean;
    alertDeleteLoading: boolean;
}

const initialState: AlertState = {
    userAlerts: [],
    selectedAlert: undefined,
    userAlertsLoading: true,
    selectedAlertLoading: false,
    userAlertsError: false,
    selectedAlertError: false,
    alertCreateLoading: false,
    alertEditLoading: false,
    alertDeleteLoading: false,
};

export default (state = initialState, action: AlertDispatchTypes) => {
    switch (action.type) {
        case ALERT_ALL_LOADING:
            return {
                ...state,
                userAlertsLoading: true,
                userAlertsError: false,
            };
        case ALERT_CREATE_LOADING: // TODO: do this properly
            return {
                ...state,
                alertCreateLoading: true,
                selectedAlertLoading: true,
                selectedAlertError: false,
            };
        case ALERT_EDIT_LOADING: // TODO: do this properly
            return {
                ...state,
                alertEditLoading: true,
            };
        case ALERT_DELETE_LOADING: // TODO: do this properly
            return {
                ...state,
                alertDeleteLoading: true,
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
                userAlerts: [],
                userAlertsLoading: false,
                userAlertsError: true,
            };
        case ALERT_CREATE_FAILURE:
        case ALERT_EDIT_FAILURE:
        case ALERT_DELETE_FAILURE:
        case ALERT_DETAILS_FAILURE:
            return {
                ...state,
                selectedAlert: undefined,
                selectedAlertLoading: false,
                selectedAlertError: true,
                alertCreateLoading: false,
                alertEditLoading: false,
                alertDeleteLoading: false,
            };
        case ALERT_ALL_SUCCESS:
            return {
                ...state,
                userAlerts: action.payload,
                userAlertsLoading: false,
                userAlertsError: false,
            };
        // TODO: do this properly
        case ALERT_DELETE_SUCCESS: {
            // replacing the outdated alert in userAlerts
            const newUserAlerts = state.userAlerts.filter(
                (alert) => alert.id !== action.payload.id
            );

            return {
                ...state,
                userAlerts: newUserAlerts,
                selectedAlert: undefined,
                selectedAlertLoading: false,
                selectedAlertError: false,
                alertDeleteLoading: false,
            };
        }
        // TODO: do this properly
        case ALERT_EDIT_SUCCESS: {
            // replacing the outdated alert in userAlerts
            const { id } = action.payload;
            const newUserAlerts: AlertData[] = [];
            state.userAlerts.forEach((alert) => {
                if (alert.id === id) {
                    return newUserAlerts.push(action.payload);
                }
                return newUserAlerts.push(alert);
            });

            return {
                ...state,
                userAlerts: newUserAlerts,
                selectedAlert: action.payload,
                selectedAlertLoading: false,
                selectedAlertError: false,
                alertEditLoading: false,
            };
        }
        case ALERT_CREATE_SUCCESS: // TODO: do this properly
            return {
                ...state,
                userAlerts: [...state.userAlerts, action.payload],
                selectedAlert: action.payload,
                selectedAlertLoading: false,
                selectedAlertError: false,
                alertCreateLoading: false,
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
