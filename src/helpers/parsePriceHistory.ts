import { PriceData } from '../actions/alertActionTypes';

export const parsePriceHistory = (priceHistory: PriceData[]) => {
    const graphData: any[] = []; // The any type doesn't matter too much because I couldn't make nivo typing work

    priceHistory.forEach((priceData) => {
        graphData.push({
            x: new Date(+priceData.date), // Maybe should parse this on the backend (when sending to client)
            y: priceData.price, // toFixed(2) ?
        });
    });

    return [
        {
            id: 'Price',
            data: graphData,
        },
    ];
};
