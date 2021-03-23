export const ALERT_ALL_LOADING = 'ALERT_ALL_LOADING';
export const ALERT_DETAILS_LOADING = 'ALERT_DETAILS_LOADING';
export const ALERT_ALL_SUCCESS = 'ALERT_ALL_SUCCESS';
export const ALERT_DETAILS_SUCCESS = 'ALERT_DETAILS_SUCCESS';
export const ALERT_ALL_FAILURE = 'ALERT_ALL_FAILURE';
export const ALERT_DETAILS_FAILURE = 'ALERT_DETAILS_FAILURE';

interface ProductData {
    url: string;
    title: string;
    imageUrl: string;
    currency: string;
}

export interface AlertData {
    id: string;
    targetPrice: number;
    product: ProductData;
}

export interface PriceData {
    price: number;
    date: string;
}

interface ProductDetailedData extends ProductData {
    priceHistory: PriceData[];
}

export interface AlertDetailedData extends Omit<AlertData, 'product'> {
    product: ProductDetailedData;
}

// interface AlertErrorData {
//     name: string;
//     message: string;
// }

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

export type AlertDispatchTypes =
    | AlertAllLoading
    | AlertDetailsLoading
    | AlertAllSuccess
    | AlertDetailsSuccess
    | AlertAllFailure
    | AlertDetailsFailure;
