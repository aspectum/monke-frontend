export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_CHECKING = 'AUTH_CHECKING';
export const AUTH_VERIFIED = 'AUTH_VERIFIED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const REGISTER_LOADING = 'REGISTER_LOADING';

export interface UserData {
    id: string;
    username: string;
    email: string;
}

interface AuthData extends UserData {
    token: string;
}

export interface AuthSuccess {
    type: typeof AUTH_SUCCESS;
    payload: AuthData;
}

export interface AuthFail {
    type: typeof AUTH_FAIL;
}

export interface AuthChecking {
    type: typeof AUTH_CHECKING;
}

export interface AuthVerified {
    type: typeof AUTH_VERIFIED;
    payload: UserData;
}

export interface RegisterSucess {
    type: typeof REGISTER_SUCCESS;
}

export interface RegisterFail {
    type: typeof REGISTER_FAIL;
}

export interface AuthSignOut {
    type: typeof AUTH_SIGN_OUT;
}
export interface LoginLoading {
    type: typeof LOGIN_LOADING;
}
export interface RegisterLoading {
    type: typeof REGISTER_LOADING;
}

export type AuthDispatchTypes =
    | AuthSuccess
    | AuthFail
    | AuthChecking
    | AuthVerified
    | RegisterSucess
    | RegisterFail
    | AuthSignOut
    | LoginLoading
    | RegisterLoading;
