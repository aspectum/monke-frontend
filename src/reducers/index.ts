import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import modalReducer from './modalReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    modalReducer,
    messageReducer,
});
