import React from 'react';
import styled from 'styled-components';

export type GridItemProps =
    | { GridRow: React.CSSProperties['gridRow'] }
    | { GridCol: React.CSSProperties['gridColumn'] };

export const GridItem = styled.div<GridItemProps>`
    display: flex;
    ${({ GridRow }: any) => (GridRow ? `grid-row: ${GridRow};` : '')}
    ${({ GridCol }: any) => (GridCol ? `grid-column: ${GridCol};` : '')}
`;
