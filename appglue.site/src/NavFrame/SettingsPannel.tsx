import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { Dispatch } from 'react';

import { FrameProps } from './FrameProps';

const useStyles = makeStyles(theme => ({
	settingsBar: {
		width: 250,
		margin: 0,
	},
	fullList: {
		width: 'auto',
	},
}));

export default function SettingsPannel({
	layoutOptions,
	setLayoutOption }: {
		layoutOptions: FrameProps;
		setLayoutOption: Dispatch<any>,
	}) {
	const classes: any = useStyles();

	const currentTheme = layoutOptions?.contentTheme ?? 'dark';
	const setCurrentTheme = (newTheme: string) => setLayoutOption((prev: FrameProps) => ({
		...prev,
		contentTheme: newTheme,
	}));

	return <React.Fragment>
		<Grid container spacing={3} className={clsx(classes.settingsBar)}>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<Typography component='h2' >Settings</Typography>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="selectThemeLabel">Theme</InputLabel>
					<Select
						labelId="selectThemeLabel"
						name="selectTheme"
						value={currentTheme}
						onChange={e => { setCurrentTheme(String(e?.target?.value)); }}
						label="Theme"
					>
						<MenuItem value='dark'>Dark Mode</MenuItem>
						<MenuItem value='cyan'>Cyan Mode</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
			</Grid>
		</Grid>
	</React.Fragment>;
};