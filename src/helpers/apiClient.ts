import axios from 'axios';
import store from '../store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Adds Auth header to appropriate requests and references API URL
// https://github.com/axios/axios#interceptors
// https://github.com/axios/axios#request-config
axios.interceptors.request.use(
    (config) => {
        const newConf = config;
        // login and register routes don't expect token
        if (!config.url!.endsWith('login') && !config.url!.endsWith('register')) {
            const { token } = store.getState().authReducer;
            newConf.headers.Authorization = `Bearer ${token}`;
        }

        // This app only sends json
        if (config.method!.toUpperCase() === 'POST') {
            newConf.headers['Content-Type'] = 'application/json';
        }

        newConf.url = API_URL + config.url;

        return newConf;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
