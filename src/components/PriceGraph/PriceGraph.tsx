import { ResponsiveLine } from '@nivo/line';
import React, { ReactElement } from 'react';
import { PriceData } from '../../actions/alertActionTypes';
import dateFormatter from '../../helpers/dateFormatter';
import { normalizeCurrency } from '../../helpers/normalizeCurrency';
import { tooltipStyle } from './PriceGraph.style';

// MORE FORMATTING OPTIONS
// https://nivo.rocks/storybook/?path=/story/line--formatting-axis-values

interface Props {
    priceHistory: PriceData[];
    currency: string;
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

const nivoTheme = {
    textColor: '#dddddd',
};

// eslint-disable-next-line react/display-name
const tooltipFormatter = (currency: string) => ({ point }: any) => {
    return (
        <div style={tooltipStyle}>
            <span>
                <strong>Date:</strong> {dateFormatter(point.data.x)}
            </span>
            <span>
                <strong>Price:</strong> {normalizeCurrency(point.data.y, currency).formatted}
                {/* <strong>Price:</strong> {`$ ${point.data.y.toFixed(2)}`} */}
            </span>
        </div>
    );
};

function PriceGraph({ priceHistory, currency }: Props): ReactElement {
    const nivoData = parsePriceHistory(priceHistory) as any;

    return (
        <ResponsiveLine
            data={nivoData}
            colors="#1439b4"
            theme={nivoTheme}
            margin={{ top: 10, right: 40, bottom: 50, left: 50 }}
            xScale={{
                type: 'time',
                // format: '%Y-%m-%d',
                format: 'native',
                // precision: 'auto',
            }}
            // xFormat="time:%Y-%m-%d" // tooltip
            tooltip={tooltipFormatter(currency)}
            // xFormat={dateFormatter} // tooltip
            yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: true,
                reverse: false,
            }}
            // yFormat=" >-$.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                format: '%b %d',
                // tickValues: 'every day', // automatic scale this way
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -30,
                legend: 'Date',
                legendOffset: 40,
                legendPosition: 'middle',
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Price',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh
            // legends={[
            //     {
            //         anchor: 'bottom-right',
            //         direction: 'column',
            //         justify: false,
            //         translateX: 100,
            //         translateY: 0,
            //         itemsSpacing: 0,
            //         itemDirection: 'left-to-right',
            //         itemWidth: 80,
            //         itemHeight: 20,
            //         itemOpacity: 0.75,
            //         symbolSize: 12,
            //         symbolShape: 'circle',
            //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemBackground: 'rgba(0, 0, 0, .03)',
            //                     itemOpacity: 1,
            //                 },
            //             },
            //         ],
            //     },
            // ]}
        />
    );
}

export default PriceGraph;
