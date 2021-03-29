export const ALERT_ALL_LOADING = 'ALERT_ALL_LOADING';
export const ALERT_DETAILS_LOADING = 'ALERT_DETAILS_LOADING';
export const ALERT_ALL_SUCCESS = 'ALERT_ALL_SUCCESS';
export const ALERT_DETAILS_SUCCESS = 'ALERT_DETAILS_SUCCESS';
export const ALERT_ALL_FAILURE = 'ALERT_ALL_FAILURE';
export const ALERT_DETAILS_FAILURE = 'ALERT_DETAILS_FAILURE';
export const ALERT_CREATE_LOADING = 'ALERT_CREATE_LOADING';
export const ALERT_CREATE_SUCCESS = 'ALERT_CREATE_SUCCESS';
export const ALERT_CREATE_FAILURE = 'ALERT_CREATE_FAILURE';
export const ALERT_EDIT_LOADING = 'ALERT_EDIT_LOADING';
export const ALERT_EDIT_SUCCESS = 'ALERT_EDIT_SUCCESS';
export const ALERT_EDIT_FAILURE = 'ALERT_EDIT_FAILURE';
export const ALERT_DELETE_LOADING = 'ALERT_DELETE_LOADING';
export const ALERT_DELETE_SUCCESS = 'ALERT_DELETE_SUCCESS';
export const ALERT_DELETE_FAILURE = 'ALERT_DELETE_FAILURE';

// -------------- Payload types --------------
interface ProductData {
    url: string;
    title: string;
    imageUrl: string;
    currency: string;
}

export interface AlertData {
    id: string;
    title: string;
    targetPrice: number;
    product: ProductData;
    wasNotified: boolean;
}

export interface PriceData {
    price: number;
    date: string;
}

interface ProductDetailedData extends ProductData {
    priceHistory: PriceData[];
    lowestPrice: PriceData;
}

export interface AlertDetailedData extends Omit<AlertData, 'product'> {
    product: ProductDetailedData;
}

// interface AlertErrorData {
//     name: string;
//     message: string;
// }

// -------------- List alerts interfaces --------------
export interface AlertAllLoading {
    type: typeof ALERT_ALL_LOADING;
}

export interface AlertDetailsLoading {
    type: typeof ALERT_DETAILS_LOADING;
}

export interface AlertAllFailure {
    type: typeof ALERT_ALL_FAILURE;
    // payload: AlertErrorData[];
}

export interface AlertDetailsFailure {
    type: typeof ALERT_DETAILS_FAILURE;
    // payload: AlertErrorData[];
}

export interface AlertAllSuccess {
    type: typeof ALERT_ALL_SUCCESS;
    payload: AlertData[];
}

export interface AlertDetailsSuccess {
    type: typeof ALERT_DETAILS_SUCCESS;
    payload: AlertDetailedData;
}

// -------------- CREATE ALERT INTERFACES --------------
export interface AlertCreateLoading {
    type: typeof ALERT_CREATE_LOADING;
}

export interface AlertCreateFailure {
    type: typeof ALERT_CREATE_FAILURE;
}

export interface AlertCreateSuccess {
    type: typeof ALERT_CREATE_SUCCESS;
    payload: AlertDetailedData;
}

// -------------- EDIT ALERT INTERFACES --------------
export interface AlertEditLoading {
    type: typeof ALERT_EDIT_LOADING;
}

export interface AlertEditFailure {
    type: typeof ALERT_EDIT_FAILURE;
}

export interface AlertEditSuccess {
    type: typeof ALERT_EDIT_SUCCESS;
    payload: AlertDetailedData;
}

// -------------- DELETE ALERT INTERFACES --------------
export interface AlertDeleteLoading {
    type: typeof ALERT_DELETE_LOADING;
}

export interface AlertDeleteFailure {
    type: typeof ALERT_DELETE_FAILURE;
}

export interface AlertDeleteSuccess {
    type: typeof ALERT_DELETE_SUCCESS;
    payload: AlertDetailedData;
}

export type AlertDispatchTypes =
    | AlertAllLoading
    | AlertDetailsLoading
    | AlertAllSuccess
    | AlertDetailsSuccess
    | AlertAllFailure
    | AlertDetailsFailure
    | AlertCreateLoading
    | AlertCreateSuccess
    | AlertCreateFailure
    | AlertEditLoading
    | AlertEditSuccess
    | AlertEditFailure
    | AlertDeleteLoading
    | AlertDeleteSuccess
    | AlertDeleteFailure;
