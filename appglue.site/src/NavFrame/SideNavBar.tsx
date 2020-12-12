import React from 'react';
import { FrameProps } from './FrameProps';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List, Typography, Divider, SvgIcon } from '@material-ui/core';
import TopMenu from './NavBarData'
import LogoIocn from '../assets/logo.svg';

const useStyles = makeStyles(() => ({
  VersionText: {
    position: 'absolute',
    bottom: 0,
    left: '72px',
  },
  Icon: {
    color: '#fff',
    minWidth: '45px',
    paddingLeft: '10px',
  },
  MenuText: {
    fontSize: '14px',
    fontWeight: 700,
  },
  divider: {
    background: '#fff',
    margin: '0 20px 10px',
  },
  listItem: {
    padding: '5px 16px ',
    marginBottom: '10px'
  },
  LogoText: {
    paddingLeft: '10px',

  },
  logo: {
    padding: '15px 20px 25px',

  }
}));

export default function SideBarNav(props: { variant: string, color: string }) {
  const classes = useStyles();
  // render pages
  //  - category (w/icon)
  //    - sub categories (if exist)
  //    - page name


  return (
    <div>
      <List>
        <ListItem className={classes.logo}>
          <img src={LogoIocn} />
          <ListItemText className={classes.LogoText}>AppGlue</ListItemText>
        </ListItem>
        <Divider className={classes.divider}></Divider>
        {
          TopMenu.map((data) => {
            return (
              <>
                <ListItem button className={classes.listItem} >
                  <ListItemIcon className={classes.Icon}>{<data.icon />}</ListItemIcon>
                  <ListItemText disableTypography className={classes.MenuText}>{data.label}</ListItemText>
                </ListItem>
              </>
            )
          })
        }
      </List>
      <Typography variant="caption" display="block" gutterBottom className={classes.VersionText}>Version 1.2</Typography>
    </div>
  );
}