import React from 'react';
import NavbarDropdown from 'react-navbar-dropdown';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DropdownItem from './DropdownItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menu__item: {
    paddingLeft: '10px',
    paddingRight: '7px',
  },
  dropdown_menu: {
    display: 'flex',
    flexDirection: 'column',
    top: '28px',
    right: '0',
    padding: '8px 0px',
    backgroundColor: '#ffffff',
    borderRadius: '3px',
    boxShadow: '0px 0px 5px #c3c5c7',
  },
  'dropdown-menu': {
    display: 'flex',
    flexDirection: 'column',
    top: '28px',
    right: '0',
    padding: '8px 0px',
    backgroundColor: '#ffffff',
    borderRadius: '3px',
    boxShadow: '0px 0px 5px #c3c5c7',
  },
  'dropdown-menu-enter': {
    opacity: 0,
  },

  'dropdown-menu-enter-active': {
    opacity: 1,
    transition: '0.2s ease-in',
  },

  'dropdown-menu-exit': {
    opacity: 1,
  },

  'dropdown-menu-exit-active': {
    opacity: 0,
    transition: '0.2s ease-in',
  },
}));

const Dropdown = ({ subpages = [], handleRenderPage }) => {
  const classes = useStyles();
  return (
    <NavbarDropdown>
      <NavbarDropdown.Toggle className="menu__item">
        <NavbarDropdown.Open>
          <KeyboardArrowDownIcon />
          {/* <FontAwesomeIcon icon={faCaretDown} fixedWidth /> */}
        </NavbarDropdown.Open>
        <NavbarDropdown.Close>
          <KeyboardArrowDownIcon style={{ transform: 'rotate(180deg)' }} />
          {/* <FontAwesomeIcon icon={faCaretUp} fixedWidth /> */}
        </NavbarDropdown.Close>
      </NavbarDropdown.Toggle>
      <NavbarDropdown.CSSTransitionMenu
        className={classes['dropdown-menu']}
        classNames={'dropdown-menu'}
        timeout={200}
      >
        {subpages.map(page => (
          <DropdownItem
            key={page.name}
            handleRenderPage={handleRenderPage}
            page={page}
          />
        ))}
      </NavbarDropdown.CSSTransitionMenu>
    </NavbarDropdown>
  );
};

export default Dropdown;
