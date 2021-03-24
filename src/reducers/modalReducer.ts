import {
    HIDE_NEW_ALERT_MODAL,
    SHOW_NEW_ALERT_MODAL,
    ModalDispatchTypes,
} from '../actions/modalActionTypes';

interface ModalState {
    showNewAlertModal: boolean;
}

const initialState: ModalState = {
    showNewAlertModal: false,
};

export default (state = initialState, action: ModalDispatchTypes) => {
    switch (action.type) {
        case HIDE_NEW_ALERT_MODAL:
            return {
                ...state,
                showNewAlertModal: false,
            };
        case SHOW_NEW_ALERT_MODAL:
            return {
                ...state,
                showNewAlertModal: true,
            };
        default:
            return state;
    }
};
