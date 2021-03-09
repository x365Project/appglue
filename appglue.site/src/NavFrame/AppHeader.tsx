import { Avatar, Button, Divider, Drawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
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
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import clsx from 'clsx';
import React, { Dispatch } from 'react';

import { FrameProps, LayoutWidth, SideBarType } from './FrameProps';
import SettingsPannel from './SettingsPannel';
import ChatsList from './TopBarChats';
import NotificationsList from './TopBarNotifications';
import ProfileList from './TopBarProfile';


export default function AppHeader(props: {
  layoutOptions: FrameProps;
  setLayoutOption: Dispatch<any>;
  rerender?: () => any | undefined;
  currentPageContent: any;
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
    appBar: {
      borderBottom: 'inset 1px',
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.topBarColor} 30%, ${props?.layoutOptions?.topBarColorEnd} 90%)`,
      color: props?.layoutOptions?.topBarFontColor,
      zIndex: theme.zIndex.drawer + 1,
      position: 'fixed',
      transition: theme.transitions.create(['width', 'margin', 'left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: '1px',
      left: theme.spacing(10),
      width: `calc(100% - ${theme.spacing(10)}px)`,
    },
    appBarShift: {
      borderBottom: 'inset 1px',
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.topBarColor} 30%, ${props?.layoutOptions?.topBarColorEnd} 90%)`,
      color: props?.layoutOptions?.topBarFontColor,
      marginLeft: '1px',
      width: `calc(100% - ${drawerWidth}px)`,
      left: '1px',
      transition: theme.transitions.create(['width', 'margin', 'left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down('xs')]: {
        left: theme.spacing(0),
        width: `calc(100% - ${theme.spacing(0)}px)`,
      },
      [theme.breakpoints.between('xs', 'sm')]: {
        left: theme.spacing(0),
        width: `calc(100% - ${theme.spacing(0)}px)`,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        left: theme.spacing(20),
        width: `calc(100% - ${theme.spacing(20)}px)`,
      },
      [theme.breakpoints.up('md')]: {
        left: theme.spacing(30),
        width: `calc(100% - ${theme.spacing(30)}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    backgroundGradient: {
      backgroundImage: `linear-gradient(135deg, ${props?.layoutOptions?.navBarColor} 30%, ${props?.layoutOptions?.navBarColorEnd} 90%)`,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
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
    Iconbutton: {
      color: props?.layoutOptions?.topBarFontColor,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      minHeight: window.innerHeight - 73,
      overflow: 'auto',
      transition: theme.transitions.create(['width', 'margin', 'left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      paddingTop: '73px',
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing(0),
        width: `calc(100% - ${theme.spacing(0)}px)`,
      },
      [theme.breakpoints.between('xs', 'sm')]: {
        marginLeft: theme.spacing(0),
        width: `calc(100% - ${theme.spacing(0)}px)`,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        marginLeft: theme.spacing(20),
        width: `calc(100% - ${theme.spacing(20)}px)`,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(30),
        width: `calc(100% - ${theme.spacing(30)}px)`,
      },
    },
    contentCompact: {
      flexGrow: 1,
      minHeight: window.innerHeight - 73,
      overflow: 'auto',
      transition: theme.transitions.create(['width', 'margin', 'left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      paddingTop: '73px',
      marginLeft: theme.spacing(10),
      width: `calc(100% - ${theme.spacing(10)}px)`,
    },
    container: {
      margin: 'auto',
      maxWidth: (props?.layoutOptions?.layoutWidth === LayoutWidth.FULL_WIDTH ? '100%' : '800px') + ' !important',
      padding: '20px',
    },

    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    userName: {
      color: props?.layoutOptions?.topBarFontColor,
      padding: '18px 8px',
      textTransform: 'none'
    },
    dropDownArrow: {
      verticalAlign: 'middle'
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
    lightTopBar: {
      background: theme.palette.primary.light,
    },
    darkTopBar: {
      background: theme.palette.primary.dark,
    },
    coloredTopBar: {
      // background: props.layoutOptions.topBarColor,
    },
    arrow: {
      transition: '.2s',
    },
    opened_arrow: {
      transform: 'rotate(180deg)',
    },
  }));

  const drawerWidth =
    props.layoutOptions.sideBarType === SideBarType.COMPACT ? 146 : 296;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
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

  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  // const [
  //   profileAnchorEl,
  //   setProfileAnchorEl,
  // ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleChatClose = () => {
    setChatAnchorEl(null);
  };


  // const handleMobileMenuOpen = (e) => {
  //   setMobileMoreAnchorEl(e.currentTarget);
  // };

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
        >
          <FullscreenIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          className={classes.Iconbutton}
          aria-label="show 4 new mails"
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
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const open = (props?.layoutOptions?.sideBarType ?? SideBarType?.DEFAULT) === SideBarType?.DEFAULT;
  const setOpen = (o = false) => {
    if (Boolean(o)) {
      props.setLayoutOption((options = {}) => {
        return {
          ...options,
          sideBarType: SideBarType.DEFAULT
        };
      });
    }
    else {
      props.setLayoutOption((options = {}) => {
        return { ...options, sideBarType: SideBarType.COMPACT };
      });
    }
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  return (
    <div
    >
      <Drawer
        classes={{ paper: clsx(classes.backgroundGradient), }} anchor="right" open={openSettings} onClose={() => setOpenSettings(false)}>
        <SettingsPannel layoutOptions={props.layoutOptions} setLayoutOption={props.setLayoutOption} />
      </Drawer>

      <AppBar
        className={clsx(
          classes.appBar,
          open && classes.appBarShift,
        )}
        elevation={0}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, classes.Iconbutton)}
          >
            <MenuIcon />
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
            <IconButton className={classes.Iconbutton} onClick={() => setOpenSettings(c => !Boolean(c))} >
              <Settings />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.Iconbutton}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(
          open ? classes.content : classes.contentCompact
        )}
      >
        <div className={classes.container}>
          {props?.currentPageContent}
        </div>
      </main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
