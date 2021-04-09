import React, { ReactElement } from 'react';
import Loader, { LoaderProps } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

interface Props {
    width: number;
    height: number;
    type?: LoaderProps['type'];
    color?: string;
}

// References
// https://www.npmjs.com/package/react-loader-spinner
// https://mhnpd.github.io/react-loader-spinner/

function Spinner({ width, height, type = 'TailSpin', color = '#3111a9' }: Props): ReactElement {
    return <Loader type={type} color={color} height={height} width={width} />;
}

export default Spinner;
