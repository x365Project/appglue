import { createMuiTheme } from '@material-ui/core/styles';

import '../../index.css';

export const theme = createMuiTheme({
	typography: {
		fontFamily: 'Mulish',
	},
	palette: {
		primary: {
			main: '#1873b9',
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
	// props: {
	// 	MuiIconButton: {
	// 		disableElevation: true,
	// 	},
	// },	
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
		}
	}
});