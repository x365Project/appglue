import React from "react";
import { FrameProps, LayoutWidth, SideBarType } from "./FrameProps";
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
import TopNavbar from './TopNavBar';
import SideBarNav from './SideNavBar';
import { Drawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';

import ScanIcon from '../assets/Scan.svg';

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
    backgroundColor: 'rgb(235,244,250)',
    color: fade(theme.palette.action.selected, 0.8),
    '&:hover': {
      backgroundColor: fade(theme.palette.info.light, 0.25),
    },
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
    color: '#93A9BF',
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
    zIndex: theme.zIndex.drawer + 1,
    // width: `calc(100% - 73px)`,
    background: '#fff',
    position: 'relative',
    left: `${drawerShiftWidth}px`,
    transition: theme.transitions.create(['width', 'margin', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      left: `${drawerShiftWidth - 46}px`,
      width: `calc(100% - ${drawerWidth}px + 238px)`,
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      left: `${drawerShiftWidth - 31}px`,
      width: `calc(100% - ${drawerWidth}px + 224px)`,
    }
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    left: '0',
    transition: theme.transitions.create(['width', 'margin', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      left: `${181 - drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px + 116px)`,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      left: `${105 - drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px + 193px)`,
    }
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    float: 'left',
    position: 'relative',
    top:'-73px',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh',
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(37),
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: theme.spacing(22) + 4,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: theme.spacing(13),
    },
    [theme.breakpoints.between('md', 'lg')]: {

    }
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(9),
    },
  },
  Iconbutton: {
    color: '#93A9BF',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },


}));

const drawerWidth = 296;
const drawerShiftWidth = 104;

export default function TopBar(props: { layoutOptions: FrameProps }) {
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

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
        <IconButton className={classes.Iconbutton} aria-label="show 4 new mails" color="inherit">
          <FullscreenIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton className={classes.Iconbutton} aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={10} color="secondary">
            <ChatBubbleOutlineIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton className={classes.Iconbutton} aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton className={classes.Iconbutton}
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

  const [open, setOpen] = React.useState(props.layoutOptions.sideBarType !== SideBarType.ICON);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={clsx(classes.grow, props.layoutOptions.layoutWidth === LayoutWidth.BOXED && classes.borderGrow)}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
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

            <IconButton className={classes.Iconbutton} aria-label="show 4 new mails" color="inherit">
              <FullscreenIcon style={{ fontSize: '30px' }} />
            </IconButton>
            <IconButton className={classes.Iconbutton} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={10} color="secondary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton className={classes.Iconbutton} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton className={classes.Iconbutton}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton className={classes.Iconbutton}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton className={classes.Iconbutton}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{ background: props.layoutOptions.color }}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <SideBarNav color={props.layoutOptions.color} variant={props.layoutOptions.sideBarType} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography>hello AppGluer</Typography>
      </main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
