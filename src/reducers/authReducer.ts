import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_CHECKING,
    AUTH_VERIFIED,
    AuthDispatchTypes,
    UserData,
} from '../actions/authActionTypes';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    user: UserData | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    token: localStorage.getItem('token'),
    user: null,
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
            };
        case AUTH_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null,
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
                user: {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email,
                },
            };
        default:
            return state;
    }
};
