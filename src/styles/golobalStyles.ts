import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { normalize } from 'styled-normalize';

export const theme: DefaultTheme = {
  color: {
    white: '#FAFAFA',
    accent: '#0095f6',
    green: '#079768',
    deepBlue: '#1d4ed8',
    blue: '#2563eb',
    lightblue: '#4789f5',
    red: '#f87171',
    pink: '#fef1f2',
    gray: '#b2bec3',
    lightgray: '#f9fafb',
  },
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
    background-color: ${props => {
      return props.theme.color.white;
    }};
    font-family: 'Open Sans', sans-serif;
    /* font-family: 'Noto Sans KR', sans-serif; */
    color: #2c2c2c;
  }
  a {
    text-decoration: none;
    color:inherit;
  }
 `;
