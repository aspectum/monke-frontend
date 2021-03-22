import axios from 'axios';
import store from '../store';

const API_URL = 'http://localhost:5000';

// Adds Auth header to appropriate requests and references API URL
axios.interceptors.request.use(
    function (config) {
        // login and register routes don't expect token
        if (!config.url!.endsWith('login') && !config.url!.endsWith('register')) {
            const { token } = store.getState().authReducer;
            config.headers.Authorization = `Bearer ${token}`;
        }

        // This app only sends json
        if (config.method!.toUpperCase() === 'POST') {
            config.headers['Content-Type'] = 'application/json';
        }

        config.url = API_URL + config.url;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axios;
