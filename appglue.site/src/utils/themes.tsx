import createPalette, { PaletteOptions } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
	interface Platte {
		primaryEnd: {
			main: React.CSSProperties['color'],
		};
	}
}

export const darkTheme = createPalette({
	primary: {
		light: '#282F38',
		main: '#282F38',
		dark: '#282F38',
	},

	secondary: {
		main: '#FB8A5A;',
	},

	text: {
		primary: '#fff',
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
	},

	action: {
		active: '#fff',
		hover: 'rgba(255, 255, 255, 0.08)',
		selected: 'rgba(255, 255, 255, 0.16)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBackground: 'rgba(255, 255, 255, 0.12)',
	},

	background: {
		default: '#fff',
		paper: '#282F38'
	},

	divider: 'rgba(255, 255, 255, 0.12)'

});


export const cyanTheme: PaletteOptions = {
	primary: {
		light: '#49A0D5',
		main: '#49A0D5',
		dark: '#0ACAC4',
	},
	secondary: {
		main: '#FB8A5A;',
	},

	text: {
		primary: '#fff',
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
	},

	action: {
		active: '#fff',
		hover: 'rgba(255, 255, 255, 0.08)',
		selected: 'rgba(255, 255, 255, 0.16)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBackground: 'rgba(255, 255, 255, 0.12)',
	},

	background: {
		default: '#fff',
		paper: '#49A0D5'
	},

	divider: 'rgba(255, 255, 255, 0.12)'

};

export const contentPalette: PaletteOptions = {
	type: 'light',
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
	},

	action: {
		active: 'rgba(0, 0, 0, 0.34)',
		hover: 'rgba(0, 0, 0, 0.04)',
		selected: 'rgba(0, 0, 0, 0.08)',
		disabled: 'rgba(0, 0, 0, 0.26)',
		disabledBackground: 'rgba(0, 0, 0, 0.12)',
	},

	background: {
		default: '#fff',
		paper: '#fff'
	},

	divider: 'rgba(0, 0, 0, 0.12)'

};