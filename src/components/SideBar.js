import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import FileList from './FilesList';
import Controls from './Controls';

const styles = {
  drawer: {
    position: 'static',
    width: '300px',
    height: '100%',
  }
};

const SideBar = ({ classes, files, onAddFiles, handleToggle, handleDelete }) => (
  <Drawer
    variant='permanent'
    classes={{
      paper: classes.drawer,
    }}
  >
    <Controls onAddFiles={onAddFiles} />
    <Divider />
    <FileList 
      files={files} 
      handleToggle={handleToggle}
      handleDelete={handleDelete}
    />
  </Drawer>
);

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  onAddFiles: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,  
}

export default withStyles(styles)(SideBar);