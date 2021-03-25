import axios from '../helpers/apiClient';
import { AppDispatch } from '../store';

import {
    ALERT_ALL_LOADING,
    ALERT_DETAILS_LOADING,
    ALERT_ALL_FAILURE,
    ALERT_DETAILS_FAILURE,
    ALERT_ALL_SUCCESS,
    ALERT_DETAILS_SUCCESS,
    ALERT_CREATE_LOADING,
    ALERT_CREATE_SUCCESS,
    ALERT_CREATE_FAILURE,
} from './alertActionTypes';
import { hideNewAlertModal } from './modalActions';

const alertDetailsQuery = `
id
targetPrice
product {
    ASIN
    url
    title
    imageUrl
    currency
    priceHistory {
        price
        date
    }
}`;

// GET ALL USER ALERTS
export const fetchAllAlerts = () => (dispatch: AppDispatch) => {
    dispatch({ type: ALERT_ALL_LOADING });

    const graphqlQuery = {
        query: `
            {
                getAlerts {
                    id
                    targetPrice
                    product {
                        url
                        title
                        imageUrl
                        currency
                    }
                }
            }
        `,
    };
    const body = JSON.stringify(graphqlQuery);

    axios
        .post('/graphql/', body)
        .then((res) => dispatch({ type: ALERT_ALL_SUCCESS, payload: res.data.data.getAlerts }))
        .catch((err) => {
            dispatch({ type: ALERT_ALL_FAILURE });
            console.log(err);
        });
};

// GET PRICE HISTORY FOR A CHOSEN ALERT
export const fetchAlertDetails = (id: string) => (dispatch: AppDispatch) => {
    dispatch({ type: ALERT_DETAILS_LOADING });

    const graphqlQuery = {
        query: `
            query fetchAlertDetails($id: ID!) {
                getSingleAlert(id: $id) {
                    ${alertDetailsQuery}
                }
            }
        `,
        variables: {
            id,
        },
    };
    const body = JSON.stringify(graphqlQuery);

    axios
        .post('/graphql/', body)
        .then((res) =>
            dispatch({ type: ALERT_DETAILS_SUCCESS, payload: res.data.data.getSingleAlert })
        )
        .catch((err) => {
            dispatch({ type: ALERT_DETAILS_FAILURE });
            console.log(err);
        });
};

// CREATE NEW ALERT
export const createNewAlert = (url: string, targetPrice: number) => (dispatch: AppDispatch) => {
    console.log(url, targetPrice);
    dispatch({ type: ALERT_CREATE_LOADING });

    const graphqlQuery = {
        query: `
            mutation createNewAlert($url: String!, $targetPrice: Float!) {
                createAlert(url: $url, targetPrice: $targetPrice) {
                    ${alertDetailsQuery}
                }
            }
        `,
        variables: {
            url,
            targetPrice,
        },
    };
    const body = JSON.stringify(graphqlQuery);

    axios
        .post('/graphql/', body)
        .then((res) => {
            dispatch({ type: ALERT_CREATE_SUCCESS, payload: res.data.data.createAlert });
            dispatch(hideNewAlertModal() as any);
        }) // TODO: Dispatch close modal
        .catch((err) => {
            dispatch({ type: ALERT_CREATE_FAILURE });
            console.log(err);
        });
};
