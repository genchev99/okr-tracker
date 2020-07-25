import React, {useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import api from '../../../../../api';

const getRandomColor = () => '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const TasksBetweenDepartments = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [statData, setStatData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [randomColors, setRandomColors] = useState([]);

  const getTasksBetweenDepartments = async () => {
    return await api.statistics.tasksBetweenDepartments().then(({data}) => {
      const total = data.alteredObjectives.map(stat => (stat.totalObjectives / stat.totalKeyResults) || 0).reduce((a, r) => r + a, 0);
      Promise.all([
        setStatData(data.alteredObjectives.map(stat => ((stat.totalObjectives / stat.totalKeyResults) / total).toFixed(2) * 100 || 0)),
        setLabels(data.alteredObjectives.map(({name}) => name)),
        setRandomColors(data.alteredObjectives.map(() => getRandomColor())),
      ])
    }).catch(err => {
      console.error(err);
    })
  };

  useEffect(() => {
    getTasksBetweenDepartments();
  }, []);

  const data = {
    datasets: [
      {
        data: statData,
        backgroundColor: randomColors,
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels,
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Desktop',
      value: '63',
      icon: <LaptopMacIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Tablet',
      value: '15',
      icon: <TabletMacIcon />,
      color: theme.palette.error.main
    },
    {
      title: 'Mobile',
      value: '23',
      icon: <PhoneIphoneIcon />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Tasks between departments"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {labels.map((label, index) => (
            <div
              className={classes.device}
              key={label}
            >
              {/*<span className={classes.deviceIcon}>{device.icon}</span>*/}
              <Typography variant="body1">{label}</Typography>
              <Typography
                style={{ color: randomColors[index] }}
                variant="h2"
              >
                {statData[index]}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

TasksBetweenDepartments.propTypes = {
  className: PropTypes.string
};

export default TasksBetweenDepartments;
