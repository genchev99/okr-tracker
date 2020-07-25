import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { options } from './chart';
import api from "../../../../../api";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ResultsByDepartment = props => {
  const { className, ...rest } = props;

  const [labels, setLabels] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [keyResults, setKeyResult] = useState([]);
  const [progress, setProgress] = useState([]);

  const classes = useStyles();

  const getTasksBetweenDepartments = async () => {
    return await api.statistics.resultsByDepartment().then(({data}) => {
      Promise.all([
        setLabels(data.alteredObjectives.map(({name}) => name)),
        setObjectives(data.alteredObjectives.map(({totalObjectives}) => totalObjectives)),
        setKeyResult(data.alteredObjectives.map(({totalKeyResults}) => totalKeyResults)),
        setProgress(data.alteredObjectives.map(({totalProgress}) => totalProgress)),
      ])
    }).catch(err => {
      console.error(err);
    })
  };

  useEffect(() => {
    getTasksBetweenDepartments();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Objectives',
        backgroundColor: '#ff1744',
        data: objectives,
      },
      {
        label: 'Key results',
        backgroundColor: '#ffd64d',
        data: keyResults,
      },
      {
        label: 'Progress',
        backgroundColor: '#009a9a',
        data: progress,
      }
    ]
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Objectives and key results distribution"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

ResultsByDepartment.propTypes = {
  className: PropTypes.string
};

export default ResultsByDepartment;
