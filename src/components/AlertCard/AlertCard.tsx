import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { alertCardPriceColor, colorPrimary0 } from '../../styles/colors';
import { numberCardsShowing } from '../../styles/global';

const Card = styled.div`
    display: flex;
    height: calc(100% / ${numberCardsShowing});
    padding: 10px 5px;
    margin-left: 6px; // Accounting for scrollbar width
    border-right: 1px solid #fff;

    ${({ active }) => {
        if (active) {
            return `
                background-color: ${colorPrimary0};
                border: 1px solid #fff;
                border-right: none;
            `;
        }
        return '';
    }}
`;

const AlertImage = styled.div`
    height: 100%;
    width: 25%;
    flex-grow: 1; // grow because the description will have fixed width

    // Use the available space, but don't go over it
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        margin: auto;
    }
`;

const AlertDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 120px; // TODO: do this in em
    padding: 0 15px;
`;

const AlertTargetPrice = styled.span`
    color: ${alertCardPriceColor};
    font-weight: 900;
`;

interface Props {
    imageUrl: string;
    title: string;
    targetPrice: string;
    onClick: () => void;
    active: boolean;
}

export default ({ imageUrl, title, targetPrice, onClick, active }: Props): ReactElement => (
    <Card active={active} onClick={onClick}>
        <AlertImage>
            <img src={imageUrl} alt="" />
        </AlertImage>
        <AlertDescription>
            <span className="alert-title">{title}</span>
            <span>
                Target price: <AlertTargetPrice>{targetPrice}</AlertTargetPrice>
            </span>
        </AlertDescription>
    </Card>
);
