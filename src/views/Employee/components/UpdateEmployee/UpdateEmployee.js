import React, { useEffect, useState } from 'react';
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

const UpdateEmployee = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    uid: '',
    department: '',
    info: null,
    result: null,
    isRetrieved: false,
    isUpdated: false
  });

  useEffect(() => console.log(values), [values]);


  const options = {
    headers: {
      'x-api-key': process.env.REACT_APP_EMPLOYEES_API_KEY
    }
  };

  const body = {
    uid: values.uid,
    department: values.department,
    info: { ...values.info }
  };

  const { get, put, response, loading, error } = useFetch(
    process.env.REACT_APP_API_URL,
    options
  );

  const handleChangeTableKeys = event => {
    setValues({
      ...values,
      info: null,
      result: null,
      isRetrieved: false,
      isUpdated: false,
      [event.target.name]: event.target.value
    });
  };

  const handleRetrieve = async event => {
    event.preventDefault()
    const request = await get(`/employee/${values.uid}/department/${values.department}`)
    if (response.ok) {
      if (request.Count === 0) {
        setValues({ ...values, result: 'Not found!' });
      }
      if (request.Count === 1) {
        setValues({ ...values, isRetrieved: true, info: { ...request.Items[0].info }, result: 'Found!' })
      }
    }
  };

  // const handleUpdate = async event => {
  //   event.preventDefault();
  //   await put('/employee', body);
  //   if (response.ok) {
  //     setValues({
  //       uid: '',
  //       department: '',
  //       isRetrieved: true
  //     });
  //   }
  // };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleRetrieve}>
        <CardHeader
          subheader="src/views/Employee/components/UpdateEmployee/UpdateEmployee.js"
          title="Update Employee"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="uid"
            name="uid"
            onChange={handleChangeTableKeys}
            required
            size="small"
            type="text"
            value={values.uid}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="department"
            name="department"
            onChange={handleChangeTableKeys}
            required
            size="small"
            style={{ marginTop: '1rem' }}
            type="text"
            value={values.department}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="outlined"
          >
            Retrieve
          </Button>
          {error && <MuiTypography variant="button">Error!</MuiTypography>}
          {loading && <CircularProgress
            color="secondary"
            size={30}
          />}
          {(values.result === 'Not found!') && <MuiTypography variant="button">{values.result}</MuiTypography>}
        </CardActions>
      </form>
      {values.isRetrieved &&
        values.info && 
        <div>
          <Divider />
          {Object.keys(values.info).map((key, index) => {
            return (
              <div key={`updateDiv-${index}`}>
                <TextField
                  fullWidth
                  key={`infoKey-${key}-${index}`}
                  label="key"
                  name={key}
                  type="text"
                  value={key}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  key={`infoValue-${key}-${index}`}
                  label="value"
                  name={values.info[key]}
                  type="text"
                  value={values.info[key]}
                  variant="outlined"
                />
              </div>
            );
          })}
          <CardActions>
            <Button
              color="primary"
              type="submit"
              variant="outlined"
            >
           Update
            </Button>
            {error && <MuiTypography variant="button">Error!</MuiTypography>}
            {loading && <CircularProgress
              color="secondary"
              size={30}
            />}
            {values.isUpdated &&
           <MuiTypography variant="button">Updated!</MuiTypography>
            }
          </CardActions>
        </div>
      }
    </Card>
  );
};

UpdateEmployee.propTypes = {
  className: PropTypes.string
};

export default UpdateEmployee;
