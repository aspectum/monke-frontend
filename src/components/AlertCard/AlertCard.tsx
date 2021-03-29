import React, { ReactElement } from 'react';
import './AlertCard.scss';

interface Props {
    imageUrl: string;
    title: string;
    targetPrice: string;
    onClick: () => void;
    active: boolean;
}

function AlertCard({ imageUrl, title, targetPrice, onClick, active }: Props): ReactElement {
    return (
        <div className={`alert-card ${active ? 'active' : ''}`} onClick={onClick}>
            <div className="alert-image">
                <img src={imageUrl} alt="" />
            </div>
            <div className="alert-desc">
                <span className="alert-title">{title}</span>
                <span>
                    Target price: <span className="alert-target-price">{targetPrice}</span>
                </span>
            </div>
        </div>
    );
}

export default AlertCard;
