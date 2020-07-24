import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div 
      {...rest} 
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link 
          component="a" 
          href="https://kintyre.co/" 
          target="_blank"
        >
          Kintyre
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        <Link
          component="a"
          href="https://github.com/Kintyre/kintyre_web_ui_reference_new"
          target="_blank"
        >
          https://github.com/Kintyre/kintyre_web_ui_reference_new
        </Link>
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
