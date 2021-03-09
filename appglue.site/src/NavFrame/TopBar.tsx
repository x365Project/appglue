import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { Dispatch } from 'react';

import AppHeader from './AppHeader';
import { FrameProps, LayoutWidth, SideBarType } from './FrameProps';
import SideNavBar from './SideNavBar';

export default function TopBar(props: {
  layoutOptions: FrameProps;
  setLayoutOption: Dispatch<any>;
  rerender?: () => any | undefined;
}) {
  // if vertical, collapse top bar hamburg
  // search
  // -- on right
  // full screen
  // chat with counter
  // notifications with counter
  // profile (name, pic, drop down)
  //   - edit profile
  //   - edit look and feel
  //   - logout


  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    borderGrow: {
      maxWidth: '1440px',
      margin: '0 auto',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      whiteSpace: 'nowrap',
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      // color: fade(theme.palette.action.selected, 0.8),
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.info.light, 0.25),
      // },
      marginRight: theme.spacing(2),
      marginLeft: '0 !important',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(1, 2, 0),
      float: 'right',
      display: 'inline-block',
      color: "rgba(0, 0, 0, 0.2)",
      // color: '#93A9BF',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      fontSize: '14px',
      padding: theme.spacing(1),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '15ch',
      },
    },
    sectionDesktop: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    sectionMobile: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    root: {
      width: '1440px',
      display: 'flex',
      flexGrow: 1,
    },
    // toolbar: {
    //   paddingRight: 24, // keep right padding when drawer closed
    // },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '73px',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    backgroundGradient: {
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.navBarColor} 30%, ${props?.layoutOptions?.navBarColorEnd} 90%)`,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      color: props?.layoutOptions?.navBarFontColor
    },
    drawerPaper: {
      float: 'left',
      position: 'fixed',
      whiteSpace: 'nowrap',
      height: window.innerHeight,
      // background: theme.palette.primary.main,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(0),
      },
      [theme.breakpoints.between('xs', 'sm')]: {
        width: theme.spacing(0),
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: theme.spacing(20),
      },
      [theme.breakpoints.up('md')]: {
        width: theme.spacing(30),
      },
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      height: '100vh',
      width: theme.spacing(10),
    },
  }));

  const drawerWidth =
    props.layoutOptions.sideBarType === SideBarType.COMPACT ? 146 : 296;

  const classes = useStyles();

  const [
    notificationAnchorEl,
    setNotificationAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [
    profileAnchorEl,
    setProfileAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [
    chatAnchorEl,
    setChatAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleRenderPage = (renderPage: any) => {
    setCurrentPageContent(renderPage(props.layoutOptions, props.setLayoutOption, props.rerender));
  };

  const open = (props?.layoutOptions?.sideBarType ?? SideBarType?.DEFAULT) === SideBarType?.DEFAULT;

  const [currentPageContent, setCurrentPageContent] = React.useState(
    <Typography>hello AppGluer</Typography>
  );

  return (
    <div
      className={clsx(
        classes.grow,
        props.layoutOptions.layoutWidth === LayoutWidth.BOXED &&
        classes.borderGrow
      )}
    >
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.backgroundGradient, classes.drawer, classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <SideNavBar
          handleRenderPage={handleRenderPage}
          navBarTheme={props.layoutOptions.navBarTheme}
          variant={props.layoutOptions.sideBarType}
          sideBarType={props.layoutOptions.sideBarType}
          layoutOptions={props.layoutOptions}
          sideBarOpen={open}
        />
      </Drawer>

      <AppHeader {...props} currentPageContent={currentPageContent} />
    </div>
  );
}
