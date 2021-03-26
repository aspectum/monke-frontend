import {
    MessageDispatchTypes,
    MessageTypes,
    MESSAGE_CLOSE,
    MESSAGE_ERROR,
    MESSAGE_SUCCESS,
    MESSAGE_TIMEOUT,
} from '../actions/messageActionTypes';

interface MessageState {
    showMessage: boolean;
    messages: string[];
    messageType: MessageTypes; // https://stackoverflow.com/questions/26855423/how-to-require-a-specific-string-in-typescript-interface/45801281#45801281
}

const initialState: MessageState = {
    showMessage: false,
    messages: [''],
    messageType: MessageTypes.Success,
};

export default (state = initialState, action: MessageDispatchTypes) => {
    switch (action.type) {
        case MESSAGE_ERROR:
            return {
                ...state,
                showMessage: true,
                messages: action.payload,
                messageType: MessageTypes.Error,
            };
        case MESSAGE_SUCCESS:
            return {
                ...state,
                showMessage: true,
                messages: action.payload,
                messageType: MessageTypes.Success,
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
