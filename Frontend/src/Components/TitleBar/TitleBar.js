import React from 'react';
import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../images/logo.png';

const TitleBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position='static'>
      <Toolbar>
        <Avatar className={classes.avatar} variant='circle' src={logo} />
        <Typography className={classes.typoGraphy} variant='h2'>
          Not Gmail
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
