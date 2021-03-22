import axios from 'axios';
import { AppDispatch, AppGetState } from '../store';

import apiURL from '../helpers/apiURL';
import { AUTH_SUCCESS, AUTH_FAIL, AUTH_CHECKING, AUTH_VERIFIED } from './authActionTypes';

interface AxiosConfig {
    headers: {
        'Content-Type': string;
        Authorization?: string;
    };
}

export const sendWithToken = (getState: AppGetState) => {
    // Get token from state
    const { token } = getState().authReducer;

    const config: AxiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

// VERIFY IF USER IS AUTHENTICATED
export const verifyUser = () => (dispatch: AppDispatch, getState: AppGetState) => {
    dispatch({ type: AUTH_CHECKING });

    axios
        .get(apiURL('/auth/'), sendWithToken(getState))
        .then((res) => dispatch({ type: AUTH_VERIFIED, payload: res.data }))
        .catch((err) => {
            dispatch({ type: AUTH_FAIL });
            console.log(err);
        });
};

// LOGIN
export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
    // Headers
    const config: AxiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ email, password });

    axios
        .post(apiURL('/auth/login'), body, config)
        .then((res) => dispatch({ type: AUTH_SUCCESS, payload: res.data }))
        .catch((err) => {
            dispatch({ type: AUTH_FAIL });
            console.log(err);
        });
};
