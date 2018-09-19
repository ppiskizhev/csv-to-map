import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import FileList from './FilesList';
import Controls from './Controls';
import { Hidden } from '@material-ui/core';

const styles = theme => ({
  modal: {
    zIndex: 2700,
  },
  drawer: {
    height: '100%',
    width: '90%',
    maxWidth: 300,
    [theme.breakpoints.up('md')]: {
      position: 'static',
      width: '350px',
      maxWidth: 'none',
    },
  },
});

const SideBar = ({
  classes,
  files,
  isOpen,
  handleAddFiles,
  handleToggle,
  handleDelete,
  handleDrawerToggle,
}) => (
  <React.Fragment>
    <Hidden smDown>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >
        <Controls onAddFiles={handleAddFiles} />
        <Divider />
        <FileList
          files={files}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </Drawer>
    </Hidden>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={handleDrawerToggle}
        classes={{
          modal: classes.modal,
          paper: classes.drawer,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Controls onAddFiles={handleAddFiles} />
        <Divider />
        <FileList
          files={files}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </Drawer>
    </Hidden>
  </React.Fragment>
);

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleAddFiles: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideBar);
