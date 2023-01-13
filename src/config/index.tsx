import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    body{
        width: 90vw !important;
        height: 100vh;
    }

    html {
        font-family: 'Roboto', sans-serif;
    }

`

export default GlobalStyle;