import React from 'react';
import { FrameProps } from './FrameProps';
import Dropdown from './Dropdown';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List, Divider } from '@material-ui/core';
import TopMenu from './NavBarData';
import LogoIocn from '../assets/logo.svg';
import { PageRoutes } from '../Pages/PageRoutes';
import { LayoutWidth } from './FrameProps';
import { ContentTheme } from './FrameProps';
import { TopBarTheme } from './FrameProps';
import { NavBarTheme } from './FrameProps';
import { addToObject } from '../utils/helpers';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    background: 'rgba(235,244,250,0.2)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(235,244,250,0.2)',
    },
    marginRight: theme.spacing(2),
    width: '240px',
    marginLeft: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '240px',
    },
  },
  searchIcon: {
    padding: theme.spacing(1, 1, 0),
    float: 'right',
    display: 'inline-block',
    color: '#fff',
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
  appBar: {
    height: '72px',
    zIndex: theme.zIndex.drawer + 2,
    // width: `calc(100% - 73px)`,
    background: 'linear-gradient(90.16deg, #49A0D5 -0.48%, #00D1C1 102.05%)',
    color: theme.palette.common.white,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  Iconbutton: {
    color: '#ffffff',
    marginLeft: '44px',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  HorizontalMenu: {
    display: 'flex',
    color: '#677C95',
    background: '#fff',
    height: '40px',
  },
  MenuIcon: {
    color: '#00D1C1',
    minWidth: '38px',
  },
  LogoBlock: {
    margin: ' 12px 33px',
    [theme.breakpoints.up('sm')]: {
      margin: ' 4px 33px',
    },
  },
  LogoIcon: {
    paddingRight: '10px',
  },
  ButtonMenu: {
    padding: '0',
    margin: '0 0 0 24px',
    width: 'unset',
  },
  LogoMenuIcon: {
    color: '#ffffff',
  },
  content: {
    backgroundColor: '#f7fbfd',
    lexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    fontFamily: 'Mulish',
  },
  userName: {
    padding: '13px 0 0 10px',
  },
  borderGrow: {
    maxWidth: '1440px',
    margin: '0 auto',
  },
  lightContentTheme: {
    background: '#f7fbfd',
  },
  darkContentTheme: {
    background: '#424C5C',
  },
  lightTopBar: {
    background: theme.palette.primary.light,
  },
  darkTopBar: {
    background: theme.palette.primary.dark,
  },
  coloredTopBar: {
    // background: theme.palette.primary.main,
  },
  darkNavBar: {
    background: theme.palette.primary.dark,
  },
  lightNavBar: {
    background: theme.palette.primary.light,
  },
  coloredNavBar: {
    // background: theme.palette.primary.main,
  },
  arrow: {
    paddingLeft: '7px',
    transition: '.2s',
  },
}));

export default function TopBarNav(props: { layoutOptions: FrameProps }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleRenderPage = (renderPage: any) => {
    setCurrentPageContent(renderPage());
  };

  // const handleMobileMenuOpen = (e) => {
  //   setMobileMoreAnchorEl(e.currentTarget);
  // };

  let previous = {};

  React.useEffect(() => {
    PageRoutes.getRootPages().map(page => {
      if (page.getSubPages().length > 0) {
        const result = addToObject(previous, page.name, false);
        previous = result;
        setLinksWithSubpages(result);
      }
      page.getSubPages().map(subpage => {
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
  const [currentPageContent, setCurrentPageContent] = React.useState(
    <Typography>hello AppGluer</Typography>
  );
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          className={classes.Iconbutton}
          aria-label="show 4 new mails"
          color="inherit"
        >
          <FullscreenIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          className={classes.Iconbutton}
          aria-label="show 4 new mails"
          color="inherit"
        >
          <Badge badgeContent={10} color="secondary">
            <ChatBubbleOutlineIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          className={classes.Iconbutton}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          className={classes.Iconbutton}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div
      className={clsx(
        classes.grow,
        props.layoutOptions.layoutWidth === LayoutWidth.BOXED &&
          classes.borderGrow
      )}
    >
      <div
        className={clsx(
          classes.grow,
          props.layoutOptions.layoutWidth === LayoutWidth.BOXED &&
            classes.borderGrow
        )}
      >
        <AppBar
          position="static"
          style={
            props.layoutOptions.topBarTheme === TopBarTheme.COLORED
              ? {
                  background: props.layoutOptions.colorGradientEnd,
                }
              : {}
          }
          className={clsx(
            classes.appBar,
            props.layoutOptions.topBarTheme === TopBarTheme.DARK &&
              classes.darkTopBar,
            props.layoutOptions.topBarTheme === TopBarTheme.COLORED &&
              classes.coloredTopBar,
            props.layoutOptions.topBarTheme === TopBarTheme.LIGHT &&
              classes.lightTopBar
          )}
        >
          <Toolbar className={classes.LogoBlock}>
            <img src={LogoIocn} className={classes.LogoIcon} />
            <Typography>AppGlue</Typography>
            <IconButton
              className={classes.Iconbutton}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                className={classes.Iconbutton}
                aria-label="show 4 new mails"
                color="inherit"
              >
                <FullscreenIcon
                  style={{ fontSize: '30px' }}
                  className={classes.LogoMenuIcon}
                />
              </IconButton>
              <IconButton
                className={classes.Iconbutton}
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={10} color="secondary">
                  <ChatBubbleOutlineIcon className={classes.LogoMenuIcon} />
                </Badge>
              </IconButton>
              <IconButton
                className={classes.Iconbutton}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon className={classes.LogoMenuIcon} />
                </Badge>
              </IconButton>
              <IconButton
                className={classes.Iconbutton}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle className={classes.LogoMenuIcon} />
              </IconButton>
              <Typography className={classes.userName}>John Doe</Typography>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                className={classes.Iconbutton}
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon className={classes.LogoMenuIcon} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <div>
        <List
          style={
            props.layoutOptions.navBarTheme === NavBarTheme.COLORED
              ? {
                  background: props.layoutOptions.colorGradientEnd,
                }
              : {}
          }
          className={clsx(
            classes.HorizontalMenu,
            props.layoutOptions.navBarTheme === NavBarTheme.DARK &&
              classes.darkNavBar,
            props.layoutOptions.navBarTheme === NavBarTheme.COLORED &&
              classes.coloredNavBar,
            props.layoutOptions.navBarTheme === NavBarTheme.LIGHT &&
              classes.lightNavBar
          )}
        >
          {PageRoutes.getRootPages().map(page => {
            return (
              <>
                <NavItem
                  key={page.name}
                  page={page}
                  classes={classes}
                  handleToggleSubpages={handleToggleSubpages}
                  handleRenderPage={handleRenderPage}
                />
              </>
            );
          })}
        </List>
      </div>
      <main
        className={clsx(
          classes.content,
          props.layoutOptions.contentTheme === ContentTheme.LIGHT &&
            classes.lightContentTheme,
          props.layoutOptions.contentTheme === ContentTheme.DARK &&
            classes.darkContentTheme
        )}
      >
        <Typography align="center">{currentPageContent}</Typography>
      </main>
    </div>
  );
}

const NavItem = ({
  page,
  classes,
  handleRenderPage,
}: {
  page: any;
  classes: any;
  isOpened?: boolean;
  handleToggleSubpages: (name: string) => void;
  handleRenderPage: any;
}) => {
  const subpages = page.getSubPages();

  return (
    <ListItem button className={classes.ButtonMenu}>
      <ListItemIcon
        onClick={() => handleRenderPage(page.renderPage)}
        className={classes.MenuIcon}
      >
        {page.renderIcon()}
      </ListItemIcon>
      <ListItemText onClick={() => handleRenderPage(page.renderPage)}>
        <span>{page.name}</span>
      </ListItemText>
      {subpages.length > 0 && (
        // <KeyboardArrowDownIcon
        //   onClick={() => handleToggleSubpages(page.name)}
        //   className={clsx(classes.arrow, isOpened && classes.opened_arrow)}
        // />
        <Dropdown handleRenderPage={handleRenderPage} subpages={subpages} />
      )}
    </ListItem>
  );
};
