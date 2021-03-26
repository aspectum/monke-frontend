import {
    MessageDispatchTypes,
    MESSAGE_CLOSE,
    MESSAGE_ERROR,
    MESSAGE_SUCCESS,
    MESSAGE_TIMEOUT,
} from '../actions/messageActionTypes';

interface MessageState {
    showMessage: boolean;
    message: string[];
    messageType: 'error' | 'success';
}

const initialState: MessageState = {
    showMessage: false,
    message: [],
    messageType: 'success',
};

export default (state = initialState, action: MessageDispatchTypes) => {
    switch (action.type) {
        case MESSAGE_ERROR:
            return {
                ...state,
                showMessage: true,
                message: action.payload,
                messageType: 'error',
            };
        case MESSAGE_SUCCESS:
            return {
                ...state,
                showMessage: true,
                message: action.payload,
                messageType: 'success',
            };
        case MESSAGE_TIMEOUT:
        case MESSAGE_CLOSE:
            return {
                ...state,
                showMessage: false,
            };
        default:
            return state;
    }
};
