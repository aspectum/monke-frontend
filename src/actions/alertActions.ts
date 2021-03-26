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
    ALERT_EDIT_LOADING,
    ALERT_EDIT_FAILURE,
    ALERT_EDIT_SUCCESS,
    ALERT_DELETE_FAILURE,
    ALERT_DELETE_LOADING,
    ALERT_DELETE_SUCCESS,
} from './alertActionTypes';
import { showErrorMessage, showSuccessMessage } from './messageActions';
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
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
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
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
        });
};

// CREATE NEW ALERT
export const createNewAlert = (url: string, targetPrice: number) => (dispatch: AppDispatch) => {
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
            dispatch(
                showSuccessMessage([
                    `Alert for ${res.data.data.createAlert.product.title} created successfully`,
                ]) as any
            );
        }) // TODO: Dispatch close modal
        .catch((err) => {
            dispatch({ type: ALERT_CREATE_FAILURE });
            dispatch(hideNewAlertModal() as any);
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
        });
};

// EDIT ALERT
export const editAlert = (id: string, newPrice: number) => (dispatch: AppDispatch) => {
    dispatch({ type: ALERT_EDIT_LOADING });

    const graphqlQuery = {
        query: `
            mutation editAlert($id: ID!, $newPrice: Float) {
                editAlert(id: $id, newPrice: $newPrice) {
                    ${alertDetailsQuery}
                }
            }
        `,
        variables: {
            id,
            newPrice,
        },
    };
    const body = JSON.stringify(graphqlQuery);

    axios
        .post('/graphql/', body)
        .then((res) => {
            dispatch({ type: ALERT_EDIT_SUCCESS, payload: res.data.data.editAlert });
            dispatch(
                showSuccessMessage([
                    `Alert for ${res.data.data.editAlert.product.title} edited successfully`,
                ]) as any
            );
        })
        .catch((err) => {
            dispatch({ type: ALERT_EDIT_FAILURE });
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
        });
};

// DELETE ALERT
export const deleteAlert = (id: string) => (dispatch: AppDispatch) => {
    dispatch({ type: ALERT_DELETE_LOADING });

    const graphqlQuery = {
        query: `
            mutation deleteAlert($id: ID!) {
                deleteAlert(id: $id) {
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
        .then((res) => {
            dispatch({ type: ALERT_DELETE_SUCCESS, payload: res.data.data.deleteAlert });
            dispatch(
                showSuccessMessage([
                    `Alert for ${res.data.data.deleteAlert.product.title} deleted successfully`,
                ]) as any
            );
        })
        .catch((err) => {
            dispatch({ type: ALERT_DELETE_FAILURE });
            let messages = ['Unknown error occurred'];
            if (err.response) {
                messages = err.response.data.errors.map((e: any) => e.message as string);
            }
            dispatch(showErrorMessage(messages) as any);
            console.log(messages);
        });
};
