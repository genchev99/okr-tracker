import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Group from '@material-ui/icons/Group';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to='/employees'>
      <ListItemIcon>
        <Group/>
      </ListItemIcon>
      <ListItemText primary="Employees"/>
    </ListItem>
  </div>
);