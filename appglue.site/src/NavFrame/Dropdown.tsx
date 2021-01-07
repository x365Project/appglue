import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  MenuItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  NotificationIcon: {},
  NotificationText: {
    fontSize: '14px',
  },
}));

const Dropdown = ({
  subpages = [],
  handleRenderPage,
}: {
  subpages: any;
  handleRenderPage: any;
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const classes = useStyles();
  const handleDropdownClose = () => {
    setAnchorElement(null);
  };

  const handleArrowClick = (e: any) => {
    setAnchorElement(e.currentTarget);
  };

  const handleItemClick = (renderPage: any) => {
    handleRenderPage(renderPage);
    handleDropdownClose();
  };

  return (
    <>
      <KeyboardArrowDownIcon onClick={handleArrowClick} />
      <Menu
        id="notification-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleDropdownClose}
        elevation={0}
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
            // maxHeight: 268,
            minWidth: '150px',
          },
        }}
      >
        {subpages.map((page: any) => (
          <MenuItem
            onClick={() => handleItemClick(page.renderPage)}
            key={page.name}
            className={classes.MenuItem}
          >
            {/* <div>
              <ListItemIcon className={classes.NotificationIcon}>
                {page.renderIcon()}
              </ListItemIcon>
            </div> */}
            <div>
              <ListItemText className={classes.NotificationText}>
                {page.name}
              </ListItemText>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
