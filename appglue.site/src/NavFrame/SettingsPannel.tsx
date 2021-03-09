import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@material-ui/core/colors';
import clsx from 'clsx';
import React, { Dispatch } from 'react';

import { ContentTheme, FrameProps, FrameSize, Layout, LayoutWidth, SideBarType } from './FrameProps';

const materialColors = [
	...Object.keys(amber).map(key => String(amber[key])),
	...Object.keys(blue).map(key => String(blue[key])),
	...Object.keys(blueGrey).map(key => String(blueGrey[key])),
	...Object.keys(brown).map(key => String(brown[key])),
	...Object.keys(common).map(key => String(common[key])),
	...Object.keys(cyan).map(key => String(cyan[key])),
	...Object.keys(deepOrange).map(key => String(deepOrange[key])),
	...Object.keys(deepPurple).map(key => String(deepPurple[key])),
	...Object.keys(green).map(key => String(green[key])),
	...Object.keys(grey).map(key => String(grey[key])),
	...Object.keys(indigo).map(key => String(indigo[key])),
	...Object.keys(lightBlue).map(key => String(lightBlue[key])),
	...Object.keys(lightGreen).map(key => String(lightGreen[key])),
	...Object.keys(lime).map(key => String(lime[key])),
	...Object.keys(orange).map(key => String(orange[key])),
	...Object.keys(pink).map(key => String(pink[key])),
	...Object.keys(purple).map(key => String(purple[key])),
	...Object.keys(red).map(key => String(red[key])),
	...Object.keys(teal).map(key => String(teal[key])),
	...Object.keys(yellow).map(key => String(yellow[key])),];

export default function SettingsPannel({
	layoutOptions,
	setLayoutOption }: {
		layoutOptions: FrameProps;
		setLayoutOption: Dispatch<any>,
	}) {

	const useStyles = makeStyles(theme => ({
		settingsBar: {
			width: 250,
			margin: 0,
		},
		fullList: {
			width: 'auto',
		},
		fontColor: {
			border: layoutOptions?.navBarFontColor + ' !important',
			color: layoutOptions?.navBarFontColor + ' !important',
		}
	}));

	const classes: any = useStyles();

	const setSideBarType = (newType = SideBarType.DEFAULT) => setLayoutOption((prev: FrameProps) => ({
		...prev,
		sideBarType: newType,
	}));

	const layout = layoutOptions?.layout ?? Layout.VERTICAL;
	const setLayout = (newType = Layout.VERTICAL) => setLayoutOption((prev: FrameProps) => ({
		...prev,
		layout: newType,
	}));

	const frameSize = layoutOptions?.frameSize ?? FrameSize.STANDARD;
	const setFrameSize = (newType = FrameSize.STANDARD) => setLayoutOption((prev: FrameProps) => ({
		...prev,
		frameSize: newType,
	}));

	return <React.Fragment>
		<Grid container spacing={3} className={clsx(classes.settingsBar)}>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<Typography component='h2' >Settings</Typography>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="contentTheme">contentTheme</InputLabel>
					<Select
						labelId="contentTheme"
						name="contentTheme"
						value={layoutOptions.contentTheme}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								contentTheme: e?.target?.value,
							}));
						}}
						label="contentTheme"
					>
						{[ContentTheme.DARK, ContentTheme.LIGHT, ContentTheme.MAIN].map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="layoutWidth">layoutWidth</InputLabel>
					<Select
						labelId="layoutWidth"
						name="layoutWidth"
						value={layoutOptions.layoutWidth}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								layoutWidth: e?.target?.value,
							}));
						}}
						label="layoutWidth"
					>
						{[LayoutWidth.FULL_WIDTH, LayoutWidth.BOXED,].map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="selectFrameSize">frameSize</InputLabel>
					<Select
						labelId="selectFrameSize"
						name="frameSize"
						value={frameSize}
						onChange={e => { setFrameSize((e?.target?.value)); }}
						label="frameSize"
					>
						{Object.keys(FrameSize).map(key => {
							return <MenuItem key={key} value={FrameSize[key]} >{FrameSize[key]}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="selectSideBarType">MenuType</InputLabel>
					<Select
						labelId="selectSideBarType"
						name="sideBarType"
						value={layoutOptions?.sideBarType}
						onChange={e => { setSideBarType((e?.target?.value)); }}
						label="MenuType"
					>
						{Object.keys(SideBarType).map(key => {
							return <MenuItem key={key} value={SideBarType[key]} >{SideBarType[key]}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="selectLayout">layout</InputLabel>
					<Select
						labelId="selectLayout"
						name="layout"
						value={layout}
						onChange={e => { setLayout((e?.target?.value)); }}
						label="layout"
					>
						{Object.keys(Layout).map(key => {
							return <MenuItem key={key} value={Layout[key]} >{Layout[key]}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="topBarFontColor">topBarFontColor</InputLabel>
					<Select
						labelId="topBarFontColor"
						name="topBarFontColor"
						value={layoutOptions.topBarFontColor}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								topBarFontColor: e?.target?.value,
							}));
						}}
						label="topBarFontColor"
					>
						{materialColors.map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="topBarColor">topBarColor</InputLabel>
					<Select
						labelId="topBarColor"
						name="topBarColor"
						value={layoutOptions.topBarColor}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								topBarColor: e?.target?.value,
								topBarColorEnd: e?.target?.value,
							}));
						}}
						label="topBarColor"
					>
						{materialColors.map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="topBarColorEnd">topBarColorEnd</InputLabel>
					<Select
						labelId="topBarColorEnd"
						name="topBarColorEnd"
						value={layoutOptions.topBarColorEnd}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								topBarColorEnd: e?.target?.value,
							}));
						}}
						label="topBarColorEnd"
					>
						{materialColors.map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="navBarFontColor">navBarFontColor</InputLabel>
					<Select
						labelId="navBarFontColor"
						name="navBarFontColor"
						value={layoutOptions.navBarFontColor}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								navBarFontColor: e?.target?.value,
							}));
						}}
						label="navBarFontColor"
					>
						{materialColors.map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="navBarColor">navBarColor</InputLabel>
					<Select
						labelId="navBarColor"
						name="navBarColor"
						value={layoutOptions.navBarColor}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								navBarColor: e?.target?.value,
								navBarColorEnd: e?.target?.value,
							}));
						}}
						label="navBarColor"
					>
						{materialColors.map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<FormControl variant="outlined" className={classes.formControl} fullWidth>
					<InputLabel id="navBarColorEnd">navBarColorEnd</InputLabel>
					<Select
						labelId="navBarColorEnd"
						name="navBarColorEnd"
						value={layoutOptions.navBarColorEnd}
						onChange={e => {
							setLayoutOption((prev: FrameProps) => ({
								...prev,
								navBarColorEnd: e?.target?.value,
							}));
						}}
						label="navBarColorEnd"
					>
						{materialColors.map((item, key) => <MenuItem key={key} value={item} style={{ backgroundColor: item }} >{item}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	</React.Fragment>;
};