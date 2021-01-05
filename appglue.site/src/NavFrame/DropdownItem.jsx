import React from 'react';
import NavbarDropdown from 'react-navbar-dropdown';
// import Dropdown from './Dropdown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dropdown_menu_enter_active: {
    opacity: '1',
    transition: '0.2s ease-in',
  },

  dropdown_menu_exit: {
    opacity: 1,
  },

  dropdown_menu_exit_active: {
    opacity: 0,
    transition: '0.2s ease-in',
  },

  dropdown_menu_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 26px',
    fontSize: '16px',
    color: '#333537',
    '&:hover': {
      backgroundColor: '#f3f5f7',
    },
  },
  //   dropdown_menu_item: hover: {
  //   backgroundColor: '#f3f5f7',
  // },

  dropdown_menu_item__spacer: {
    width: '6px',
  },

  dropdown_menu_item__text: {
    padding: ' 0px 2px',
  },
}));
const DropdownItem = ({ page, handleRenderPage }) => {
  const classes = useStyles();
  return (
    <NavbarDropdown.Item
      className={classes.dropdown_menu_item}
      onClick={() => handleRenderPage(page.renderPage)}
    >
      <div>{page.renderIcon()}</div>
      <div className={classes.dropdown_menu_item__spacer} />
      <div className={classes.dropdown_menu_item__text}>{page.name}</div>
      {/* {page.getSubPages().length > 0 && (
        <Dropdown
          handleRenderPage={handleRenderPage}
          subpages={page.getSubPages()}
        />
      )} */}
    </NavbarDropdown.Item>
  );
};

export default DropdownItem;
