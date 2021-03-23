import axios from '../helpers/apiClient';
import { AppDispatch } from '../store';

import { AUTH_SUCCESS, AUTH_FAIL, AUTH_CHECKING, AUTH_VERIFIED } from './authActionTypes';

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
            console.log(err);
        });
};
