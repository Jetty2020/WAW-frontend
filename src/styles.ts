import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const theme = {
  accent: "#0095f6",
  green: "#079768",
  deepBlue: "rgb(29, 78, 216)",
  blue: "rgb(59, 130, 246)",
  red: "#d63031",
  gray: "#b2bec3",
};

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  input {
    all:unset;
  }
  * {
    box-sizing:border-box;
  }
  body {
    background-color: #FAFAFA;
    font-family: 'Noto Sans KR', sans-serif;
    color: #2c2c2c;
  }
  a {
    text-decoration: none;
    color:inherit;
  }
 `;
