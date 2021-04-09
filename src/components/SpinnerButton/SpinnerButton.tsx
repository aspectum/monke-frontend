import React, { ReactElement, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import './SpinnerButton.scss';

interface Props {
    text: string;
    loading: boolean;
}

function SpinnerButton({ text, loading }: Props): ReactElement {
    const [state, setstate] = useState(loading);
    if (state) {
        return (
            <div className="spinner-button loading" onClick={() => setstate(!state)}>
                <Spinner type="ThreeDots" width={60} height={10} />
            </div>
        );
    }
    return (
        <div className="spinner-button" onClick={() => setstate(!state)}>
            {text}
        </div>
    );
}

export default SpinnerButton;
