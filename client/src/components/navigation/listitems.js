import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Group from '@material-ui/icons/Group';
import {Link} from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to='/dashboard'>
      <ListItemIcon>
        <DashboardIcon style={{ color: '#ff1744' }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItem>
    <ListItem button component={Link} to='/employees'>
      <ListItemIcon>
        <Group style={{ color: '#ff1744' }}/>
      </ListItemIcon>
      <ListItemText primary="Employees"/>
    </ListItem>
    <ListItem button component={Link} to='/departments'>
      <ListItemIcon>
        <WorkIcon style={{ color: '#ff1744' }}/>
      </ListItemIcon>
      <ListItemText primary="Departments"/>
    </ListItem>
    <ListItem button component={Link} to='/objectives'>
      <ListItemIcon>
        <AddBoxIcon style={{ color: '#ff1744' }}/>
      </ListItemIcon>
      <ListItemText primary="Objectives"/>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button disabled>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last week" />
    </ListItem>
    <ListItem button disabled>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button disabled>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last year" />
    </ListItem>
  </div>
);