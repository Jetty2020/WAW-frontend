import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      white: string;
      accent: string;
      green: string;
      deepBlue: string;
      blue: string;
      lightblue: string;
      red: string;
      pink: string;
      gray: string;
      lightgray: string;
    };
  }
}
