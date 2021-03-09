import { createMuiTheme } from '@material-ui/core/styles';

import { FrameProps } from '../NavFrame/FrameProps';

// import MulishRegular from '../assets/fonts/Mulish/static/Mulish-Regular.ttf';

export const createTheme = ({
  color,
  colorGradientEnd,
  contentTheme,
  ...layoutOptions
}: FrameProps) =>
  createMuiTheme({
    typography: {
      fontFamily:
        '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif !important',
    },
    palette: {
      // type: contentTheme,
      primary: {
        main: '#0A284D',
      },

      secondary: {
        main: '#00D1C1;',
      },

      error: {
        main: '#F98784;',
      },
      warning: {
        main: '#FB8A5A;',
      },
      success: {
        main: '#4CAF50;',
      }

    },
    overrides: {
      MuiOutlinedInput: {
        root: {
          fontSize: '14px',
          fontFamily: 'Mulish',
        },
      },
      MuiInputLabel: {
        root: {
          fontSize: '14px',
          fontFamily: 'Mulish',
          fontWeight: 600,
        },
      },
      MuiIconButton: {
        label: {
        },
      },
      MuiToolbar: {
        root: {
          minHeight: '73px',
        },
      },

      MuiList: {
        padding: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    // breakpoints: {
    //   values: {
    //     xs: 600,
    //     sm: 768,
    //     md: 1024,
    //     lg: 1200,
    //     xl: 1920,
    //   },
    // },
  });
