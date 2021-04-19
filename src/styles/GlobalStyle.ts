import { lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { aLightenAmmount, color1, colorPrimary4 } from './colors';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        width: 100%;
        overflow: hidden; // There's some x-overflow being caused by nothing, apparently
        color: #ccc;
        font-size: 10px
    }

    body {
        height: 100%;
        margin: 0;

        background-color: ${colorPrimary4};
    }

    #root {
        height: 100%;
        margin: 0;
        display: flex;
        flex-flow: column nowrap;
    }

    // TODO: add separate stye for a, btn
    a {
        text-decoration: none;
        color: ${lighten(aLightenAmmount, color1)};

        &:hover {
            text-decoration: underline;
        }
    }
`;
