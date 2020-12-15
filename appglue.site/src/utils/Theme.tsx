import { createMuiTheme } from '@material-ui/core/styles';
import { FrameProps } from '../NavFrame/FrameProps';

export const createTheme = ({ color, colorGradientEnd, contentTheme, ...layoutOptions }: FrameProps) => createMuiTheme({
        typography: {
            fontFamily: 'Mulish',
        },
        palette: {
            type: contentTheme,
            primary: {
                main: color ? color : '#203156;',
                light: '#dceaf5',
                dark: '#15466b'
            },
            success: {
                main: '#00b894',
                light: '#ccf1ea',
                dark: '#2f7c6d'
            },
            error: {
                main: '#fb8a5a',
                light: '#fee8de',
                dark: '#cf705a'
            },
            text: {
                primary: '#01244e',
                secondary: '#677c95',
                disabled: '#e6e9ed'
            }
    
        },
        overrides: {
            MuiOutlinedInput: {
                root: {
                    fontSize: "14px",
                    fontFamily: 'Mulish',
                    color: '#677C95'
                }
            },
            MuiInputLabel: {
                root: {
                    fontSize: "14px",
                    fontFamily: 'Mulish',
                    color: '#677C95',
                    fontWeight: 600
                }
            },
            MuiIconButton: {
                label: {
                    color: '#677C95',
                },
            },
            MuiToolbar: {
                root: {
                    minHeight: '73px',
                }
            }
        },
        breakpoints: {
            values: {
                xs: 1144,
                sm: 1260,
                md: 1336,
                lg: 1440,
                xl: 1624,
            }
        }
    });
