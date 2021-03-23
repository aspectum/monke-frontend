import axios from '../helpers/apiClient';
import { AppDispatch } from '../store';

import {
    ALERT_ALL_LOADING,
    ALERT_DETAILS_LOADING,
    ALERT_ALL_FAILURE,
    ALERT_DETAILS_FAILURE,
    ALERT_ALL_SUCCESS,
    ALERT_DETAILS_SUCCESS,
} from './alertActionTypes';

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
// MIGHT NOT WORK
export const fetchAlertDetails = (id: string) => (dispatch: AppDispatch) => {
    dispatch({ type: ALERT_DETAILS_LOADING });

    const graphqlQuery = {
        query: `
            query fetchAlertDetails($id: ID!) {
                getSingleAlert(id: $id) {
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
                    }
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
