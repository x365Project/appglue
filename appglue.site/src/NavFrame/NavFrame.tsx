import { ThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { Dispatch } from 'react';

import { createTheme } from '../utils/Theme';
import { FrameProps, Layout } from './FrameProps';
import TopBar from './TopBar';
import TopBarNav from './TopBarNav';

export function NavFrame(props: {
  layoutOptions: FrameProps;
  setLayoutOption: Dispatch<any>;
  rerender?: () => any;
}) {
  // top bar
  // either side bar nav or top bar nav
  // render content
  const { layout } = props.layoutOptions;
  const theme = createTheme(props.layoutOptions);

  console.log('props.layoutOptions', props.layoutOptions);
  return (
    <ThemeProvider theme={theme}>
      <Grid>
        {layout === Layout.VERTICAL && <TopBar {...props} />}
        {layout === Layout.HORIZONTAL && <TopBarNav {...props} />}
      </Grid>
    </ThemeProvider>
  );
}
