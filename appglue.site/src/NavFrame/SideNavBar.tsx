import React from 'react';
import { FrameProps } from './FrameProps';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List, Typography, Divider, SvgIcon, Link } from '@material-ui/core';
import TopMenu from './NavBarData';
import LogoIocn from '../assets/logo.svg';
import { PageRoutes } from '../Pages/PageRoutes';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { NavBarTheme } from './FrameProps';
import clsx from 'clsx';
import { SideBarType } from './FrameProps';

const useStyles = makeStyles(theme => ({
  VersionText: {
    position: 'absolute',
    bottom: 0,
    left: '72px',
  },
  Icon: {
    color: '#fff',
    minWidth: '45px',
    paddingLeft: '10px',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginBottom: '5px',
      marginLeft: '10px',
    },
  },
  MenuText: {
    fontSize: '14px',
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.between('sm', 'md')]: {
      display: 'none',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      display: 'flex',
    },
  },
  divider: {
    background: '#fff',
    margin: '0 20px 10px',
  },
  listItem: {
    padding: '5px 16px ',
    marginBottom: '10px',
    [theme.breakpoints.between('xs', 'sm')]: {
      flexDirection: 'column',
      marginBottom: '12px',
    },
  },
  compactListItem: {
    flexDirection: 'column',
    marginBottom: '12px',
  },
  LogoText: {
    paddingLeft: '10px',
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: '0',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      visibility: 'hidden ',
    },
    [theme.breakpoints.up('md')]: {
      visibility: 'visible',
    },
  },
  logo: {
    padding: '15px 20px 25px',
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: '15px 20px 5px',
      flexDirection: 'column',
    },
  },
  compactLogo: {
    padding: '15px 20px 5px',
    flexDirection: 'column',
  },
  arrow: {
    paddingRight: '10px',
  },
  sideNavBarContainer: {
    height: '100%',
  },
  lightSideNavBar: {
    background: theme.palette.primary.light,
  },
  darkSideNavBar: {
    background: theme.palette.primary.dark,
  },
  coloredSideNavBar: {
    // background: theme.palette.primary.main,
  },
}));

export default function SideBarNav(props: {
  variant: string;
  color: string;
  navBarTheme: NavBarTheme;
  colorGradientEnd: string;
  sideBarType: SideBarType;
}) {
  const classes = useStyles();
  // render pages
  //  - category (w/icon)
  //    - sub categories (if exist)
  //    - page name

  return (
    <div
      style={
        props.navBarTheme === NavBarTheme.COLORED
          ? {
              background: props.colorGradientEnd,
            }
          : {}
      }
      className={clsx(
        classes.sideNavBarContainer,
        props.navBarTheme === NavBarTheme.LIGHT && classes.lightSideNavBar,
        props.navBarTheme === NavBarTheme.DARK && classes.darkSideNavBar,
        props.navBarTheme === NavBarTheme.COLORED && classes.coloredSideNavBar
      )}
    >
      <List>
        <ListItem
          className={clsx(
            classes.logo,
            props.sideBarType === SideBarType.COMPACT && classes.compactLogo
          )}
        >
          <img src={LogoIocn} />
          <ListItemText className={classes.LogoText}>AppGlue</ListItemText>
        </ListItem>
        <Divider className={classes.divider}></Divider>
        {PageRoutes.getRootPages().map(page => {
          return (
            <>
              <ListItem
                button
                className={clsx(
                  classes.listItem,
                  props.sideBarType === SideBarType.COMPACT &&
                    classes.compactListItem
                )}
              >
                <ListItemIcon className={classes.Icon}>
                  {page.renderIcon()}
                </ListItemIcon>
                <ListItemText disableTypography className={classes.MenuText}>
                  <span>{page.name}</span>
                  <KeyboardArrowDownIcon
                    style={
                      props.sideBarType === SideBarType.COMPACT
                        ? { display: 'none' }
                        : {}
                    }
                    className={classes.arrow}
                  />
                </ListItemText>
              </ListItem>
            </>
          );
        })}
      </List>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        className={classes.VersionText}
      >
        Version 1.2
      </Typography>
    </div>
  );
}
