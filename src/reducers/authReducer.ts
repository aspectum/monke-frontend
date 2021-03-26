import {
    AuthDispatchTypes,
    AUTH_CHECKING,
    AUTH_FAIL,
    AUTH_SIGN_OUT,
    AUTH_SUCCESS,
    AUTH_VERIFIED,
    REGISTER_SUCCESS,
    UserData,
} from '../actions/authActionTypes';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    user: UserData | null;
    justRegistered: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    token: localStorage.getItem('token'),
    user: null,
    justRegistered: false,
};

export default (state = initialState, action: AuthDispatchTypes) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload.token,
                user: {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email,
                },
                justRegistered: false,
            };
        case AUTH_SIGN_OUT:
        case AUTH_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null,
                justRegistered: false,
            };
        case AUTH_CHECKING:
            return {
                ...state,
                isLoading: true,
            };
        case AUTH_VERIFIED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                justRegistered: false,
                user: {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email,
                },
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                justRegistered: true,
            };
        default:
            return state;
    }
};
