export const MESSAGE_ERROR = 'MESSAGE_ERROR';
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
export const MESSAGE_TIMEOUT = 'MESSAGE_TIMEOUT';
export const MESSAGE_CLOSE = 'MESSAGE_CLOSE';

export interface MessageError {
    type: typeof MESSAGE_ERROR;
    payload: string[];
}

export interface MessageSuccess {
    type: typeof MESSAGE_SUCCESS;
    payload: string[];
}

export interface MessageTimeout {
    type: typeof MESSAGE_TIMEOUT;
}

export interface MessageClose {
    type: typeof MESSAGE_CLOSE;
}

export type MessageDispatchTypes = MessageError | MessageSuccess | MessageTimeout | MessageClose;
