import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Button,
  TextField,
  Typography as MuiTypography
} from '@material-ui/core';
import useFetch from 'use-http';

const useStyles = makeStyles((theme) => ({
  root: {'& .MuiTextField-root': {
    margin: theme.spacing(2),
    width: 230,}
  }
}));

const DeleteEmployee = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    uid: '',
    department: '',
    isDeleted: false
  });

  const options = {
    headers: {
      'x-api-key': process.env.REACT_APP_EMPLOYEES_API_KEY
    },
  };
  
  const body = { 
    uid: values.uid,
    department: values.department,
  }

  const { del, response, loading, error } = useFetch(
    process.env.REACT_APP_API_URL,
    options
  );

  const handleChange = event => {
    setValues({
      ...values,
      isDeleted: false,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await del('/employee', body);
    if (response.ok) {
      setValues({
        uid: '',
        department: '',
        isDeleted: true
      });
    }
  };

  return (
    <Card 
      {...rest} 
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader
          subheader="src/views/Employee/components/DeleteEmployee/DeleteEmployee.js"
          title="Delete Employee"
        />
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
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="outlined"
          >
            Submit
          </Button>
          {error && <MuiTypography variant="button">Error!</MuiTypography>}
          {loading && 
          <CircularProgress
            color="secondary"
            size={30}
          />}
          {values.isDeleted && <MuiTypography variant="button">Deleted!</MuiTypography>}
        </CardActions>
      </form>
    </Card>
  );
};

DeleteEmployee.propTypes = {
  className: PropTypes.string
};

export default DeleteEmployee;
