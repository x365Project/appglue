import React from 'react';
import { FrameProps, Layout } from './FrameProps';
import TopBar from './TopBar';
import TopBarNav from './TopNavBar';

import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '../utils/Theme';
export function NavFrame(props: { layoutOptions: FrameProps }) {
  // top bar
  // either side bar nav or top bar nav
  // render content
  const { layout } = props.layoutOptions;
  console.log('layout', props.layoutOptions.layoutWidth);
  const theme = createTheme(props.layoutOptions);
  return (
    <ThemeProvider theme={theme}>
      <Grid>
        {layout === Layout.VERTICAL && <TopBar {...props} />}
        {layout === Layout.HORIZONTAL && <TopBarNav {...props} />}
      </Grid>
    </ThemeProvider>
  );
}
