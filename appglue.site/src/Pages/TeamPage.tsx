import {
  Button,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { FrameProps, NavBarTheme, TopBarTheme } from '../NavFrame/FrameProps';

const colorsList = ['#F97760', '#39ACD1', '#7063C3', '#eee', '#000'];
enum Sections {
  TOPBAR = 'topbar',
  NAVBAR = 'navbar',
}
const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px 50px',
    textAlign: 'start',
  },
  paper: {
    padding: '30px',
    maxWidth: '1000px',
    height: '500px', // temporary
  },
  header: {},
  subheader: {
    margin: '10px 0',
    color: theme.palette.text.secondary,
  },
  button: {
    backgroundColor: '#E6E9ED',
    color: theme.palette.primary.main,
    padding: '15px',
    marginRight: '20px',
    // textTransform: 'uppercase'
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  mt: {
    marginTop: '20px',
  },
  colorSelector: {
    display: 'flex',
    marginTop: '20px',
  },
  colorCircle: {
    height: '25px',
    width: '25px',
    borderRadius: '50%',
    border: 'none',
    marginRight: '10px',
    cursor: 'pointer',
  },
}));

const TeamPage = ({
  layoutOptions,
  rerender,
}: {
  layoutOptions: FrameProps;
  rerender: any | undefined;
}) => {
  const classes = useStyles();
  const [isTopBarColored, setIsTopBarColored] = useState(false);
  // const [isNavBarColored, setIsNavBarColored] = useState(false);

  const handleButtonClick = (type: string): void => {
    if (type === TopBarTheme.COLORED) {
      setIsTopBarColored(true);
      rerender && rerender();
    } else {
      setIsTopBarColored(false);
      rerender && rerender();
    }

    // if (type === NavBarTheme.COLORED) {
    //   setIsNavBarColored(true);
    //   rerender && rerender();
    // } else {
    //   setIsNavBarColored(false);
    //   rerender && rerender();
    // }
  };

  const getColor = (color: string, section: Sections) => {
    if (section === Sections.NAVBAR) {
      layoutOptions.setNavBarTheme(NavBarTheme.COLORED);
      layoutOptions.setNavBarColor(color);
      rerender && rerender();
    } else if (section === Sections.TOPBAR) {
      layoutOptions.setTopBarTheme(TopBarTheme.COLORED);
      layoutOptions.setTopBarColor(color);
      rerender && rerender();
    }
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <h1 className={classes.header}>Whant to change look?</h1>
        <Divider />
        <Typography className={classes.subheader} align="left" variant="h5">
          Frame Size
        </Typography>
        <Button className={clsx(classes.button)}>Standard</Button>
        <Button className={clsx(classes.button)}>Full Screen</Button>

        <Divider className={classes.mt} />
        <Typography className={classes.subheader} align="left" variant="h5">
          Top Bar Theme
        </Typography>
        <Button
          onClick={() => handleButtonClick(TopBarTheme.LIGHT)}
          className={clsx(classes.button)}
        >
          Light
        </Button>
        <Button
          onClick={() => handleButtonClick(TopBarTheme.DARK)}
          className={clsx(classes.button)}
        >
          Dark
        </Button>
        <Button
          onClick={() => handleButtonClick(TopBarTheme.COLORED)}
          className={clsx(classes.button)}
        >
          Colored
        </Button>
        {isTopBarColored && (
          <ColorSelector
            colorsList={colorsList}
            getColor={getColor}
            section={Sections.TOPBAR}
          />
        )}
        <Divider className={classes.mt} />
        <Typography className={classes.subheader} align="left" variant="h5">
          Nav Bar Theme
        </Typography>
        <Button
          onClick={() => handleButtonClick(NavBarTheme.DARK)}
          className={clsx(classes.button)}
        >
          Light
        </Button>
        <Button
          onClick={() => handleButtonClick(NavBarTheme.LIGHT)}
          className={clsx(classes.button)}
        >
          Dark
        </Button>
        <Button
          onClick={() => handleButtonClick(NavBarTheme.COLORED)}
          className={clsx(classes.button)}
        >
          Colored
        </Button>
        {/* {isNavBarColored && (
          <ColorSelector
            colorsList={colorsList}
            getColor={getColor}
            section={Sections.TOPBAR}
          />
        )} */}
      </Paper>
    </div>
  );
};

const ColorSelector = ({
  getColor,
  colorsList,
  section,
}: {
  getColor: (color: string, section: Sections) => any;
  colorsList: any;
  section: Sections;
}) => {
  const classes = useStyles();
  return (
    <div className={classes.colorSelector}>
      {colorsList.map((color: string) => (
        <div
          key={color}
          style={{ backgroundColor: color }}
          className={classes.colorCircle}
          onClick={() => getColor(color, section)}
        ></div>
      ))}
    </div>
  );
};

export default TeamPage;
