import React, { ReactElement } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { PriceData } from '../../actions/alertActionTypes';

interface Props {
    priceHistory: PriceData[];
}

function parsePriceHistory(priceHistory: PriceData[]) {
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
}

function PriceGraph({ priceHistory }: Props): ReactElement {
    const nivoData = parsePriceHistory(priceHistory) as any;

    return (
        <ResponsiveLine
            data={nivoData}
            colors={{ scheme: 'nivo' }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
                type: 'time',
                // format: '%Y-%m-%d',
                format: 'native',
                precision: 'day',
            }}
            xFormat="time:%Y-%m-%d" // tooltip
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false,
            }}
            yFormat=" >-$.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                format: '%b %d',
                tickValues: 'every day',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
}

export default PriceGraph;
