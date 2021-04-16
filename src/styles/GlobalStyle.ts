import { lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { aLightenAmmount, color1, colorPrimary4 } from './colors';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100vh;
        color: #ccc;
        /* font-family: sans-serif; */
        font-family: 'Arial', sans-serif;
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
        font-size: 15px;
        text-decoration: underline;
        color: ${color1};

        &:hover {
            color: ${lighten(aLightenAmmount, color1)};
        }
    }
`;
