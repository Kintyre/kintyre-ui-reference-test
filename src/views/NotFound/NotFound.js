import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <RouterLink to="/">
              <Typography variant="h1">
              404: Not found.
              </Typography>
              <Typography variant="subtitle2">
              Click to return to the main page. 
              </Typography>
              <img 
                alt="Logo" 
                src="/images/logos/ks-logo-dark.png" 
                width="100"
              />
            </RouterLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
