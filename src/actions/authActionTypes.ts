export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_CHECKING = 'AUTH_CHECKING';
export const AUTH_VERIFIED = 'AUTH_VERIFIED';

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

export type AuthDispatchTypes = AuthSuccess | AuthFail | AuthChecking | AuthVerified;
