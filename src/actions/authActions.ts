import axios from '../helpers/apiClient';
import { AppDispatch } from '../store';

import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_CHECKING,
    AUTH_VERIFIED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_SIGN_OUT,
} from './authActionTypes';
import { showErrorMessage, showSuccessMessage } from './messageActions';

// VERIFY IF USER IS AUTHENTICATED
export const verifyUser = () => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_CHECKING });

    axios
        .get('/auth/')
        .then((res) => dispatch({ type: AUTH_VERIFIED, payload: res.data }))
        .catch((err) => {
            dispatch({ type: AUTH_FAIL });
            console.log(err);
        });
};

// LOGIN
export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
    // Request Body
    const body = JSON.stringify({ email, password });

    axios
        .post('/auth/login/', body)
        .then((res) => dispatch({ type: AUTH_SUCCESS, payload: res.data }))
        .catch((err) => {
            dispatch({ type: AUTH_FAIL });
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
        });
};

// LOGIN
export const register = (username: string, email: string, password: string) => (
    dispatch: AppDispatch
) => {
    // Request Body
    const body = JSON.stringify({ username, email, password });

    axios
        .post('/auth/register/', body)
        .then(() => {
            dispatch({ type: REGISTER_SUCCESS });
            dispatch(
                showSuccessMessage([
                    'Registered successfully. You can now log into your account',
                ]) as any
            );
        })
        .catch((err) => {
            dispatch({ type: REGISTER_FAIL });
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
        });
};

// SIGN OUT
export const signOut = () => (dispatch: AppDispatch) => {
    // Request Body
    dispatch({ type: AUTH_SIGN_OUT });
    dispatch(showSuccessMessage(['User signed out']) as any);
};
