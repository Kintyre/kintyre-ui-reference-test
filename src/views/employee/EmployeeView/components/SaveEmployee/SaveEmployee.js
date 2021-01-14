import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useFetch from 'use-http';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 230
    }
  },
  icon: {
    height: 28,
    width: 28,
    marginTop: 4
  }
}));

const SaveEmployee = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    uid: '',
    department: '',
    infoKey: '',
    infoValue: '',
    isAdded: false
  });

  const options = {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY
    }
  };

  const body = {
    uid: values.uid,
    department: values.department,
    info: { [values.infoKey]: values.infoValue }
  };

  const { post, response, loading, error } = useFetch(
    process.env.REACT_APP_API_URL,
    options
  );

  const handleChange = (event) => {
    setValues({
      ...values,
      isAdded: false,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await post('/employee', body);
    if (response.ok) {
      setValues({
        uid: '',
        department: '',
        infoKey: '',
        infoValue: '',
        isAdded: true
      });
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleSubmit} data-test="save-employee-form">
        <CardHeader title="Save Employee" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            helperText="Sort key"
            label="uid"
            name="uid"
            onChange={handleChange}
            required
            size="small"
            type="text"
            value={values.uid}
            variant="outlined"
            data-test="save-employee-input"
          />
          <TextField
            fullWidth
            helperText="Partition key"
            label="department"
            name="department"
            onChange={handleChange}
            required
            size="small"
            type="text"
            value={values.department}
            variant="outlined"
            data-test="save-employee-input"
          />
          {values.uid && values.department && (
            <div>
              <Divider />
              <TextField
                helperText="Info"
                id="outlined-required"
                label="key"
                name="infoKey"
                onChange={handleChange}
                required
                size="small"
                value={values.infoKey}
                variant="outlined"
                data-test="save-employee-input"
              />
              <TextField
                id="outlined-required"
                label="value"
                name="infoValue"
                onChange={handleChange}
                required
                size="small"
                value={values.infoValue}
                variant="outlined"
                data-test="save-employee-input"
              />
            </div>
          )}
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justify="space-between">
            <Grid item>
              <Button color="primary" type="submit" variant="contained" data-test="save-employee-save-button">
                save
              </Button>
            </Grid>
            <Grid item>
              {error && (
                <ErrorIcon className={classes.icon} color="secondary" />
              )}
              {loading && <CircularProgress color="secondary" size={30} />}
              {values.isAdded && (
                <CheckCircleIcon className={classes.icon} color="secondary" />
              )}
            </Grid>
          </Grid>
        </CardActions>
      </form>
    </Card>
  );
};

SaveEmployee.propTypes = {
  className: PropTypes.string
};

export default SaveEmployee;
