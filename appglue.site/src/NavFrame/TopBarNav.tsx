import { Avatar, Button, Divider, Drawer, List } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ExpandMoreSharp } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import clsx from 'clsx';
import React, { Dispatch } from 'react';

import LogoIocn from '../assets/logo.svg';
import { PageRoutes } from '../Pages/PageRoutes';
import { addToObject } from '../utils/helpers';
import Dropdown from './Dropdown';
import { ContentTheme, FrameProps, LayoutWidth } from './FrameProps';
import SettingsPannel from './SettingsPannel';
import ChatsList from './TopBarChats';
import NotificationsList from './TopBarNotifications';
import ProfileList from './TopBarProfile';

export default function TopBarNav(props: {
  layoutOptions: FrameProps;
  setLayoutOption: Dispatch<any>;
  rerender?: () => any | undefined;
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
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

  const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
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
    appBar: {
      borderBottom: 'inset 1px',
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.topBarColor} 30%, ${props?.layoutOptions?.topBarColorEnd} 90%)`,
      color: props?.layoutOptions?.topBarFontColor,
      zIndex: theme.zIndex.drawer + 1,
    },
    Iconbutton: {
      color: props?.layoutOptions?.topBarFontColor,
    },
    HorizontalMenu: {
      borderBottom: 'inset 1px',
      display: 'flex',
      color: props?.layoutOptions?.navBarFontColor,
      height: '40px',
    },
    MenuIcon: {
      // color: '#00D1C1',
      color: 'inherit',
      minWidth: '38px',
    },
    LogoBlock: {
      margin: ' 12px 33px',
      [theme.breakpoints.up('sm')]: {
        margin: ' 4px 33px',
      },
    },
    LogoIcon: {
      paddingRight: theme.spacing(1),
    },
    LogoText: {
      paddingRight: theme.spacing(5),
    },
    ButtonMenu: {
      padding: '0',
      margin: '0 0 0 24px',
      width: 'unset',
    },
    LogoMenuIcon: {
      color: 'inherit',
    },
    content: {
      // backgroundColor: '#f7fbfd',
      lexGrow: 1,
      minHeight: 'calc(100vh - 120px)',
      overflow: 'auto',
      fontFamily: 'Mulish',
    },
    container: {
      margin: 'auto',
      maxWidth: (props?.layoutOptions?.layoutWidth === LayoutWidth.FULL_WIDTH ? '100%' : '800px') + ' !important',
      padding: '20px',
    },
    userName: {
      color: props?.layoutOptions?.topBarFontColor,
      padding: '0px 0 0 10px',
    },
    borderGrow: {
      maxWidth: '1440px',
      margin: '0 auto',
    },
    backgroundGradient: {
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.navBarColor} 30%, ${props?.layoutOptions?.navBarColorEnd} 90%)`,
    },
    lightContentTheme: {
      background: '#f7fbfd',
    },
    darkContentTheme: {
      background: '#424C5C',
    },
    lightTopBar: {
      color: '#9AA5B7',
      background: theme.palette.primary.light,
    },
    darkTopBar: {
      color: '#fff',
      background: theme.palette.primary.dark,
    },
    topBarColor: {
      color: props?.layoutOptions?.topBarFontColor,
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.topBarColor} 30%, ${props?.layoutOptions?.topBarColorEnd} 90%)`,
    },
    navBarColor: {
      color: props?.layoutOptions?.navBarFontColor,
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.navBarColor} 30%, ${props?.layoutOptions?.navBarColorEnd} 90%)`,
    },
    notificationMenu: {
      paddingRight: '20px',
    },
    notificationArea: {
      overflow: 'hidden',
    },
    notificationIcon: {},
    notificationText: {
      fontSize: '14px',
    },
    notificationReceiveDate: {
      fontSize: '10px !important',
    },
    profileMenu: {
      paddingRight: '20px',
      width: theme.spacing(25),
    },
    profileIcon: {},
    profileText: {
      fontSize: '14px',
    },
    chatMenu: {
      paddingRight: '20px',
    },
    chatIcon: {},
    chatArea: {
      overflow: 'hidden',
    },
    chatText: {
      fontSize: '14px',
    },
    chatReceiveDate: {
      fontSize: '10px !important',
    },
    coloredTopBar: {
      // color: '#fff',
      // background: theme.palette.primary.main,
    },
    darkNavBar: {
      // color: '#fff',
      background: theme.palette.primary.dark,
    },
    lightNavBar: {
      // color: '#9AA5B7',
      background: theme.palette.primary.light,
    },
    coloredNavBar: {
      background: props.layoutOptions.navBarColor,
      // color: '#fff',
      // background: theme.palette.primary.main,
    },

    arrow: {
      transition: '.2s',
    },
    dropDownArrow: {
      verticalAlign: 'middle'
    },

    opened_arrow: {
      transform: 'rotate(180deg)',
    },
    navigationContainer: {
      padding: '12px 33px',
      [theme.breakpoints.up('sm')]: {
        padding: ' 4px 33px',
      },
    },
  }));

  const classes = useStyles();
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


  const handleNotificationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchorEl(e.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(e.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChatAnchorEl(e.currentTarget);
  };

  const handleRenderPage = (renderPage: any) => {
    setCurrentPageContent(renderPage());
  };

  const handleChatClose = () => {
    setChatAnchorEl(null);
  };

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
          <Badge badgeContent={10} color="error">
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
          <Badge badgeContent={1} color="error">
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
        <Drawer
          classes={{ paper: clsx(classes.backgroundGradient), }} anchor="right" open={openSettings} onClose={() => setOpenSettings(false)}>
          <SettingsPannel layoutOptions={props.layoutOptions} setLayoutOption={props.setLayoutOption} />
        </Drawer>

        <AppBar
          position="static"
          className={clsx(
            classes.appBar,
            classes.topBarColor,
          )}
        >
          <Toolbar className={classes.LogoBlock}>
            <img src={LogoIocn} className={classes.LogoIcon} alt="logo" />
            <Typography className={classes.LogoText}>AppGlue</Typography>
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
              >
                <FullscreenIcon />
              </IconButton>
              <IconButton
                className={classes.Iconbutton}
                onClick={handleChatClick}
              >
                <Badge badgeContent={10} color="secondary">
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
              <Menu
                id="chat-menu"
                anchorEl={chatAnchorEl}
                keepMounted
                open={Boolean(chatAnchorEl)}
                onClose={handleChatClose}
                elevation={1}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                PaperProps={{
                  style: {
                    maxHeight: 268,
                    width: '286px',
                  },
                }}
              >
                {ChatsList.map(item => (
                  <div
                    key={item.id}>
                    <MenuItem
                      onClick={handleChatClose}
                      className={classes.chatMenu}
                    >
                      <div>
                        <ListItemIcon className={classes.chatIcon}>
                          {<item.icon />}
                        </ListItemIcon>
                      </div>
                      <div className={classes.chatArea}>
                        <ListItemText className={classes.chatText}>
                          {item.text}
                        </ListItemText>
                        <ListItemText className={classes.chatReceiveDate}>
                          {item.dateOfReceiving}
                        </ListItemText>
                      </div>
                    </MenuItem>
                    <Divider />
                  </div>
                ))}
              </Menu>
              <IconButton
                className={classes.Iconbutton}
                aria-label="show 17 new notifications"
                aria-haspopup="true"
                aria-controls="notification-menu"
                onClick={handleNotificationClick}
              >
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                id="notification-menu"
                anchorEl={notificationAnchorEl}
                keepMounted
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
                elevation={1}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                PaperProps={{
                  style: {
                    maxHeight: 268,
                    width: '286px',
                  },
                }}
              >
                {NotificationsList.map(item => (
                  <div key={item.id}>
                    <MenuItem
                      onClick={handleNotificationClose}
                      className={classes.notificationMenu}
                    >
                      <div>
                        <ListItemIcon className={classes.notificationIcon}>
                          {<item.icon />}
                        </ListItemIcon>
                      </div>
                      <div className={classes.notificationArea}>
                        <ListItemText className={classes.notificationText}>
                          {item.text}
                        </ListItemText>
                        <ListItemText className={classes.notificationReceiveDate}>
                          {item.dateOfReceiving}
                        </ListItemText>
                      </div>
                    </MenuItem>
                    <Divider />
                  </div>
                ))}
              </Menu>
              <Button
                onClick={handleProfileClick}
              >
                <Avatar />
                <Typography className={classes.userName}>John Doe
                <ExpandMoreSharp
                    className={clsx(classes.arrow, classes.dropDownArrow, Boolean(profileAnchorEl) && classes.opened_arrow)}
                  />
                </Typography>
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={profileAnchorEl}
                keepMounted
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileClose}
                elevation={1}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {ProfileList.map(item => (
                  <div key={item.id}>
                    <MenuItem
                      onClick={handleProfileClose}
                      className={classes.profileMenu}
                    >
                      <div>
                        <ListItemIcon className={classes.profileIcon}>
                          {<item.icon />}
                        </ListItemIcon>
                      </div>
                      <div>
                        <ListItemText className={classes.profileText}>
                          {item.text}
                        </ListItemText>
                      </div>
                    </MenuItem>
                    <Divider />
                  </div>
                ))}
              </Menu>
              <IconButton
                className={classes.Iconbutton} onClick={() => setOpenSettings(c => !Boolean(c))} >
                <Settings />
              </IconButton>
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
          className={clsx(
            classes.HorizontalMenu,
            classes.navigationContainer,
            classes.navBarColor,
          )}
        >
          {PageRoutes.getRootPages().map(page => {
            return (
              <NavItem
                key={page.name}
                page={page}
                classes={classes}
                handleToggleSubpages={handleToggleSubpages}
                handleRenderPage={handleRenderPage}
              />
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
        <div className={classes.container}>{currentPageContent}</div>
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
