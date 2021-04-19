import { createGlobalStyle } from 'styled-components';
import RobotoRegularWoff from '../fonts/roboto-v27-latin-regular.woff';
import Roboto700Woff from '../fonts/roboto-v27-latin-700.woff';
import RobotoRegularWoff2 from '../fonts/roboto-v27-latin-regular.woff2';
import Roboto700Woff2 from '../fonts/roboto-v27-latin-700.woff2';
import NunitoRegularWoff from '../fonts/nunito-v16-latin-regular.woff';
import Nunito800Woff from '../fonts/nunito-v16-latin-800.woff';
import NunitoRegularWoff2 from '../fonts/nunito-v16-latin-regular.woff2';
import Nunito800Woff2 from '../fonts/nunito-v16-latin-800.woff2';

// https://google-webfonts-helper.herokuapp.com/fonts/nunito?subsets=latin

export const FontStyle = createGlobalStyle`
    /* roboto-regular - latin */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url(${RobotoRegularWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url(${RobotoRegularWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    /* roboto-700 - latin */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: local(''),
            url(${Roboto700Woff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url(${Roboto700Woff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    
    /* nunito-regular - latin */
    @font-face {
        font-family: 'Nunito';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url(${NunitoRegularWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url(${NunitoRegularWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    /* nunito-800 - latin */
    @font-face {
        font-family: 'Nunito';
        font-style: normal;
        font-weight: 800;
        src: local(''),
            url(${Nunito800Woff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url(${Nunito800Woff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }


    html {
        font-family: 'Roboto', sans-serif;
        /* font-family: 'Nunito'; */
    }
`;
