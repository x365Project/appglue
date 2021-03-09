import { Divider, List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';
import React from 'react';

import LogoIocn from '../assets/logo.svg';
import { PageRoutes } from '../Pages/PageRoutes';
import { addToObject } from '../utils/helpers';
import { NavBarTheme, SideBarType } from './FrameProps';

export default function SideNavBar(props: {
  variant: string;
  navBarTheme: NavBarTheme;
  sideBarType: SideBarType;
  handleRenderPage: any;
  layoutOptions: any;
  sideBarOpen: Boolean;
}) {

  const useStyles = makeStyles(theme => ({
    VersionText: {
      position: 'absolute',
      bottom: 0,
      left: '72px',
    },
    Icon: {
      color: props?.layoutOptions?.navBarFontColor,
      minWidth: '45px',
      paddingLeft: '10px',
      [theme.breakpoints.between('xs', 'sm')]: {
        justifyContent: 'center',
        padding: '0px',
      },
    },
    MenuText: {
      fontSize: '1rem',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
      [theme.breakpoints.between('xs', 'sm')]: {
        display: 'none'
      },
      [theme.breakpoints.between('sm', 'md')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
    },
    MenuTextOpen: {
      fontSize: '1rem',
      justifyContent: 'space-between',
      display: 'none'
    },
    divider: {
      background: props?.layoutOptions?.navBarFontColor + "5",
      margin: '0 20px 10px',
    },
    listItem: {
      padding: '5px 16px ',
      marginBottom: '10px',
      [theme.breakpoints.between('sm', 'md')]: {
        flexFlow: 'column'
      },
      [theme.breakpoints.up('md')]: {
        flexFlow: 'row'
      },
    },
    compactListItem: {
      flexDirection: 'column',
      marginBottom: '12px',
    },
    LogoText: {
      paddingLeft: '10px',
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
      [theme.breakpoints.between('xs', 'sm')]: {
        display: 'none'
      },
      [theme.breakpoints.between('sm', 'md')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
    },
    LogoTextClose: {
      paddingLeft: '10px',
      display: 'none'
    },
    logo: {
      padding: '15px 20px 25px',
      [theme.breakpoints.between('xs', 'sm')]: {
        flexFlow: 'column',
        paddingBottom: '10px',
      },
    },
    compactLogo: {
      padding: '15px 20px 5px',
    },
    arrow: {
      paddingRight: '10px',
      transition: '.2s',
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: '0px'
      },
    },
    opened_arrow: {
      transform: 'rotate(180deg)',
      paddingLeft: '10px',
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: '0px'
      },
    },
    sideNavBarContainer: {
      height: '100%',
      fontFamily:
        '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    subpagesInner: {
      transition: '.5s',
    },
    subpagesInnerClosed: {
      opacity: '0',
      transition: '.2s',
    },
    subpagesInnerOpened: {
      opacity: '1',
      transition: '.2s',
    },
    subpagesContent: {
      maxHeight: '0',
      transition: 'max-height .5s',
      overflow: 'hidden',
    },
    subpagesOpened: {
      maxHeight: '500px',
      overflow: 'hidden',
    },
  }));

  const classes = useStyles();
  // render pages
  //  - category (w/icon)
  //    - sub categories (if exist)
  //    - page name

  let previous = {};

  React.useEffect(() => {
    PageRoutes.getRootPages().forEach(page => {
      if (page.getSubPages().length > 0) {
        const result = addToObject(previous, page.name, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        previous = result;
        setLinksWithSubpages(result);
      }
      page.getSubPages().forEach(subpage => {
        if (subpage.getSubPages().length > 0) {
          const result = addToObject(previous, page.name, false);
          previous = result;
          setLinksWithSubpages(result);
        }
      });
    });
  }, []);

  const handleToggleSubpages = (name: string) => {
    const copy: any = Object.assign({}, linksWithSubpages);
    copy[name] = !copy[name];
    setLinksWithSubpages(copy);
  };

  const [linksWithSubpages, setLinksWithSubpages] = React.useState<any>({});
  return (
    <div
      className={clsx(classes.sideNavBarContainer)}
    >
      <List>
        <ListItem
          className={clsx(
            classes.logo,
            props.sideBarType === SideBarType.COMPACT && classes.compactLogo
          )}
        >
          <img src={LogoIocn} alt="logo" />
          <ListItemText className={props?.sideBarOpen ? classes.LogoText : classes.LogoTextClose}>AppGlue</ListItemText>
        </ListItem>
        <Divider className={clsx(classes.divider)}></Divider>
        {PageRoutes.getRootPages().map(page => (
          <React.Fragment key={page.name}>
            <NavItem
              isOpened={linksWithSubpages[page.name]}
              handleToggleSubpages={handleToggleSubpages}
              key={page.name}
              page={page}
              classes={classes}
              props={props}
            />
            <div
              className={clsx(
                classes.subpagesContent,
                linksWithSubpages[page.name] && classes.subpagesOpened
              )}
            >
              {
                // linksWithSubpages[page.name] ?
                page.getSubPages().map(subpage => (
                  <div
                    key={subpage.name}
                    className={clsx(
                      classes.subpagesInner,
                      linksWithSubpages[page.name]
                        ? classes.subpagesInnerOpened
                        : classes.subpagesInnerClosed
                    )}
                  >
                    <NavItem
                      isOpened={linksWithSubpages[subpage.name]}
                      handleToggleSubpages={handleToggleSubpages}
                      key={subpage.name}
                      page={subpage}
                      classes={classes}
                      props={props}
                    />
                    {/* <div
                        className={clsx(
                          classes.subpagesContent,
                          linksWithSubpages[page.name] && classes.subpagesOpened
                        )}
                      >
                        {linksWithSubpages[subpage.name]
                          ? subpage
                              .getSubPages()
                              .map(secondSubpage => (
                                <NavItem
                                  handleToggleSubpages={handleToggleSubpages}
                                  key={secondSubpage.name}
                                  page={secondSubpage}
                                  classes={classes}
                                  props={props}
                                />
                              ))
                          : null}
                      </div> */}
                  </div>
                ))
                // : null
              }
            </div>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

const NavItem = ({
  page,
  classes,
  props,
  handleToggleSubpages,
  isOpened = false,
}: {
  page: any;
  classes: any;
  props: any;
  isOpened?: boolean;
  handleToggleSubpages: (name: string) => void;
}) => {
  const subpages = page.getSubPages();
  return (
    <ListItem
      button
      className={clsx(
        classes.listItem,
        props.sideBarType === SideBarType.COMPACT && classes.compactListItem
      )}
    >
      <ListItemIcon
        onClick={() => props.handleRenderPage(page.renderPage)}
        className={classes.Icon}
      >
        {page.renderIcon()}
      </ListItemIcon>
      <ListItemText disableTypography className={
        (props?.sideBarOpen) ? classes.MenuText : classes.MenuTextOpen}>
        <span onClick={() => props.handleRenderPage(page.renderPage)}>
          {page.name}
        </span>
        {subpages.length > 0 && (
          <KeyboardArrowDownIcon
            onClick={() => handleToggleSubpages(page.name)}
            className={clsx(classes.arrow, isOpened && classes.opened_arrow)}
          // style={
          //   props.sideBarType === SideBarType.COMPACT
          //     ? { display: 'none' }
          //     : {}
          // }
          />

        )}
      </ListItemText>
    </ListItem>
  );
};
