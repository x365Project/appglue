import { createMuiTheme } from '@material-ui/core/styles';

import { FrameProps } from '../NavFrame/FrameProps';
import { cyanTheme, darkTheme } from './themes';

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
      ...((contentTheme === 'dark') && darkTheme),
      ...((contentTheme === 'cyan') && cyanTheme),
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
