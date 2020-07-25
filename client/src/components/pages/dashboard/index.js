import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  LastWeekComparison,
  WeeklyProgress,
  TasksProgress,
  ResultsByDepartment,
  TasksBetweenDepartments,
} from './components';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container style={{marginTop: '30px'}} component="main" maxWidth="lg" className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <LastWeekComparison />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <WeeklyProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <ResultsByDepartment />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <TasksBetweenDepartments />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
        </Grid>

      </Grid>
    </Container>
  );
};

export default Dashboard;