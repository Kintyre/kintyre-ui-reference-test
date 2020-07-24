import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const GetEmployee = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    uid: '',
    department: '',
    info: null,
    result: null
  });

  const options = {
    headers: {
      'x-api-key': process.env.REACT_APP_EMPLOYEES_API_KEY,
    }
  }

  const { get, response, loading, error } = useFetch(process.env.REACT_APP_API_URL, options)

  const handleChange = event => {
    setValues({
      ...values,
      info: null,
      result: null,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault()
    const request = await get(`/employee/${values.uid}/department/${values.department}`)
    if (response.ok) {
      if (request.Count === 0) {
        setValues({ ...values, result: 'Not found!' });
      }
      if (request.Count === 1) {
        setValues({ ...values, info: { ...request.Items[0].info }, result: 'Found!' })
      }
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader
          subheader="src/views/Employee/components/GetEmployee/GetEmployee.js"
          title="Get Employee"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
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
            label="department"
            name="department"
            onChange={handleChange}
            required
            size="small"
            type="text"
            value={values.department}
            variant="outlined"
          />
          {values.info &&
          <div>
            <Divider />
            <TableContainer component={Paper}>
              <Table
                aria-label="simple table"
                className={classes.table}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(values.info).map( (key, index) => {
                    return(
                      <TableRow key={`rowKey-${index}`}>
                        <TableCell
                          component="th"
                          key={`cellKey-${index}`}
                          scope="row"
                        >
                          {key}
                        </TableCell>
                        <TableCell align="right">{values.info[key]}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          }
        </CardContent>
        <Divider />
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
          {values.result && <MuiTypography variant="button">{values.result}</MuiTypography>}
        </CardActions>
      </form>
    </Card>
  );
};

GetEmployee.propTypes = {
  className: PropTypes.string
};

export default GetEmployee;
