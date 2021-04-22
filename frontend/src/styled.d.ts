// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    radius: {
      small: string;
      medium: stirng;
      big: string;
    };

    colors: {
      white: string;
      black: string;
      primary: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
    };

    shadow: {
      soft: string;
      medium: string;
    };
  }
}
