import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

import WorkSansTTF from '../assets/fonts/WorkSans-VariableFont_wght.ttf';

const WorkSans = {
  fontFamily: 'Work Sans Thin',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Work Sans Thin'),
    local('Work Sans Thin'),
    url(${WorkSansTTF}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const colors = {
  white: "#fff",
  black: '#000',
  darkBlack: "#141414",
  green: '#1abc9c',
  red: '#ed4337',

  text: "#212529",

  sushiPrimary: "#d03801",
  sushiBackground: "#fff8ee",
  sushiCardBackground: 'rgb(240, 233, 231)',
  sushiCardBorder: 'rgb(226, 214, 207)',
  sushiCardBoxShadow: 'rgb(247, 244, 242) 1px 1px 0px inset'
};

const breakpoints = createBreakpoints({
  keys: ["xs", "sm", "md", "lg", "xl"],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800
  }
})

const iswapTheme =  {
  typography: {
    fontFamily: [
      '"Work Sans Thin"',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '48px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h2: {
      fontSize: '36px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h3: {
      fontSize: '22px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.3
    },
    h4: {
      fontSize: '16px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    h5: {
      fontSize: '14px',
      fontWeight: '600',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: 1.2
    },
    body1: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    body2: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  },
  type: 'light',
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [WorkSans],
      },
    },
    MuiFormHelperText: {
      contained: {
        fontSize: '16px',
        fontWeight: '600',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2
      }
    },
    MuiSelect: {
      select: {
        padding: '9px'
      },
      selectMenu: {
        minHeight: '30px',
        display: 'flex',
        alignItems: 'center'
      }
    },
    MuiButton: {
      root: {
        borderRadius: '10px',
        padding: '10px 24px'
      },
      outlined: {
        padding: '10px 24px',
        borderWidth: '2px !important'
      },
      text: {
        padding: '10px 24px'
      },
      label: {
        textTransform: 'none',
        fontSize: '1rem'
      }
    },
    MuiInput: {
      underline: {
        '&:before': { //underline color when textfield is inactive
          display: 'none !important',
          height: '0px',
          borderBottom: 'none !important'
        },
        '&:after': { //underline color when textfield is inactive
          display: 'none !important',
          height: '0px',
          borderBottom: 'none !important'
        },
        '&:hover:not($disabled):before': { //underline color when hovered
          display: 'none !important',
          height: '0px',
          borderBottom: 'none !important'
        },
      }
    },
    MuiInputBase: {
      root: {
        height: '55px'
      },
      input: {
        fontSize: '16px',
        fontWeight: '600',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2
      }
    },
    MuiOutlinedInput: {
      input: {
        "&::placeholder": {
          color: colors.text
        },
        color: colors.text,
        padding: '14px',
        borderRadius: '10px'
      },
      root: {
        // border: "none !important",
        borderRadius: '10px',
        background: colors.white
      },
      notchedOutline: {
        // border: "none !important"
      }
    },
    MuiSnackbar : {
      root: {
        maxWidth: 'calc(100vw - 24px)'
      },
      anchorOriginBottomLeft: {
        bottom: '12px',
        left: '12px',
        '@media (min-width: 960px)': {
          bottom: '50px',
          left: '80px'
        }
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: colors.white,
        padding: '0px',
        minWidth: 'auto',
        '@media (min-width: 960px)': {
          minWidth: '500px',
        }
      },
      message: {
        padding: '0px'
      },
      action: {
        marginRight: '0px'
      }
    },
    MuiToggleButton: {
      root: {
        borderRadius: '10px',
        textTransform: 'none',
        minWidth:  '100px',
        border: 'none',
        background: colors.white,
        '& > span > h4': {
          color: '#555',
        },
        '&:hover': {
          backgroundColor: "rgba(47,128,237, 0.2)",
        },
        "&$selected": {
          backgroundColor: '#2f80ed',
          '& > span > h4': {
            color: '#fff',
          },
          '&:hover': {
            backgroundColor: "rgba(47,128,237, 0.2)",
            '& > span > h4': {
              color: '#000',
            },
          },
        }
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: colors.darkBlack,
        fontSize: '14px',
        fontWeight: '600',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.2
      }
    }
  },
  palette: {
    primary: {
      main: colors.sushiPrimary
    },
    secondary: {
      main: colors.sushiPrimary
    },
    text: {
      primary: colors.text,
      secondary: colors.text
    }
  },
  breakpoints: breakpoints
};

export default iswapTheme;
