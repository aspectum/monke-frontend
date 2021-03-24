export const HIDE_NEW_ALERT_MODAL = 'HIDE_NEW_ALERT_MODAL';
export const SHOW_NEW_ALERT_MODAL = 'SHOW_NEW_ALERT_MODAL';

export interface HideNewAlertModal {
    type: typeof HIDE_NEW_ALERT_MODAL;
}

export interface ShowNewAlertModal {
    type: typeof SHOW_NEW_ALERT_MODAL;
}

export type ModalDispatchTypes = HideNewAlertModal | ShowNewAlertModal;
