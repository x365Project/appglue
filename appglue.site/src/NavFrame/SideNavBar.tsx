import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List, Divider } from '@material-ui/core';
import LogoIocn from '../assets/logo.svg';
import { PageRoutes } from '../Pages/PageRoutes';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { NavBarTheme } from './FrameProps';
import clsx from 'clsx';
import { SideBarType } from './FrameProps';
import { addToObject } from '../utils/helpers';

export default function SideBarNav(props: {
  variant: string;
  color: string;
  navBarTheme: NavBarTheme;
  colorGradientEnd: string;
  sideBarType: SideBarType;
  handleRenderPage: any;
  navBarColor: string;
  navBarFontColor: string;
  layoutOptions: any;
}) {
  const [navBarFontColor, setNavBarFontColor] = React.useState<string>('#fff');

  React.useEffect(() => {
    switch (props.navBarTheme) {
      case NavBarTheme.DARK:
        setNavBarFontColor('#fff');
        break;
      case NavBarTheme.LIGHT:
        setNavBarFontColor('#9AA5B7');
        break;
      case NavBarTheme.COLORED:
        setNavBarFontColor(props.navBarFontColor);
        break;

      default:
        setNavBarFontColor('#fff');
        break;
    }
  }, [props.navBarFontColor, props.navBarTheme]);

  const useStyles = makeStyles(theme => ({
    VersionText: {
      position: 'absolute',
      bottom: 0,
      left: '72px',
    },
    Icon: {
      color: 'inherit',
      minWidth: '45px',
      paddingLeft: '10px',
      [theme.breakpoints.between('xs', 'sm')]: {
        marginBottom: '5px',
        marginLeft: '10px',
      },
    },
    MenuText: {
      fontSize: '1rem',
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
      margin: '0 20px 10px',
      background: navBarFontColor,
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
      color: 'inherit',
      padding: '15px 20px 25px',
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: '15px 20px 5px',
        flexDirection: 'column',
      },
    },
    compactLogo: {
      color: 'inherit',
      padding: '15px 20px 5px',
      flexDirection: 'column',
    },
    arrow: {
      paddingRight: '10px',
      transition: '.2s',
    },
    sideNavBarContainer: {
      color: navBarFontColor,
      height: '100%',
      fontFamily:
        '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    lightSideNavBar: {
      // color: '#9AA5B7',
      background: theme.palette.primary.light,
    },
    darkSideNavBar: {
      // color: '#fff',
      background: theme.palette.primary.dark,
    },
    coloredSideNavBar: {
      background: props.navBarColor,
      // color: '#fff',
      // background: theme.palette.primary.main,
    },
    opened_arrow: {
      transform: 'rotate(180deg)',
      paddingLeft: '10px',
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
          <img src={LogoIocn} alt="logo" />
          <ListItemText className={classes.LogoText}>AppGlue</ListItemText>
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
      <ListItemText disableTypography className={classes.MenuText}>
        <span onClick={() => props.handleRenderPage(page.renderPage)}>
          {page.name}
        </span>
        {subpages.length > 0 && (
          <KeyboardArrowDownIcon
            onClick={() => handleToggleSubpages(page.name)}
            style={
              props.sideBarType === SideBarType.COMPACT
                ? { display: 'none' }
                : {}
            }
            className={clsx(classes.arrow, isOpened && classes.opened_arrow)}
          />
        )}
      </ListItemText>
    </ListItem>
  );
};
