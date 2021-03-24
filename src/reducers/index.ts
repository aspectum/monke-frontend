import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    modalReducer,
});
