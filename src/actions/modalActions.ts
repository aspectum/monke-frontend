import { AppDispatch } from '../store';
import { HIDE_NEW_ALERT_MODAL, SHOW_NEW_ALERT_MODAL } from './modalActionTypes';

export const showNewAlertModal = () => (dispatch: AppDispatch) => {
    dispatch({ type: SHOW_NEW_ALERT_MODAL });
};

export const hideNewAlertModal = () => (dispatch: AppDispatch) => {
    dispatch({ type: HIDE_NEW_ALERT_MODAL });
};
