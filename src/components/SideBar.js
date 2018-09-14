import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import FileList from './FilesList';
import Controls from './Controls';

const info = [
  {
    id: 0,
    name: 'Загребин глеб Игоревич'
  },
  {
    id: 1,
    name: 'Пискижев Петр Александрович'
  }
];

const styles = {
  drawer: {
    position: 'static',
    width: '300px',
    height: '100%',
  }
};

const SideBar = ({ classes }) => (
  <Drawer
    variant='permanent'
    classes={{
      paper: classes.drawer,
    }}
  >
    <Controls />
    <Divider />
    <FileList items={info} />
  </Drawer>
);

export default withStyles(styles)(SideBar);