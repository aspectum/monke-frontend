import { AppDispatch } from '../store';
import {
    MESSAGE_CLOSE,
    MESSAGE_ERROR,
    MESSAGE_SUCCESS,
    MESSAGE_TIMEOUT,
} from './messageActionTypes';

const timeout = 5000; // message timeout in ms

export const showErrorMessage = (messages: string[]) => (dispatch: AppDispatch) => {
    dispatch({ type: MESSAGE_ERROR, payload: messages });

    setTimeout(() => {
        dispatch({ type: MESSAGE_TIMEOUT });
    }, timeout);
};

export const showSuccessMessage = (messages: string[]) => (dispatch: AppDispatch) => {
    dispatch({ type: MESSAGE_SUCCESS, payload: messages });

    setTimeout(() => {
        dispatch({ type: MESSAGE_TIMEOUT });
    }, timeout);
};

export const closeMessage = () => (dispatch: AppDispatch) => {
    dispatch({ type: MESSAGE_CLOSE });
};
