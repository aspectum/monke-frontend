import React from 'react';
import styled from 'styled-components';

interface GridWrapperBasics {
    height?: React.CSSProperties['height'];
    width?: React.CSSProperties['width'];
}

interface GridWrapperWithRows extends GridWrapperBasics {
    TemplateRows: React.CSSProperties['gridTemplateRows'];
}

interface GridWrapperWithCols extends GridWrapperBasics {
    TemplateCols: React.CSSProperties['gridTemplateColumns'];
}

export type GridWrapperProps = GridWrapperWithRows | GridWrapperWithCols;

export const GridWrapper = styled.div<GridWrapperProps>`
    display: grid;
    ${({ TemplateRows }: any) => (TemplateRows ? `grid-template-rows: ${TemplateRows};` : '')}
    ${({ TemplateCols }: any) => (TemplateCols ? `grid-template-columns: ${TemplateCols};` : '')}
    ${({ height }) => (height ? `height: ${height};` : '')}
    ${({ width }) => (width ? `width: ${width};` : '')}
`;
