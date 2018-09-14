import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => {
  checkbox: {
    color: 'red'
  }
}

const FileList = ({ files, handleToggle, handleDelete }) => (
  <List>
    {Object.keys(files).map(name => (
      <ListItem 
        key={name}
        button
        disableRipple
        onClick={() => handleToggle(name)}
      >
        <Checkbox 
          disableRipple
          color={'red'}
          checked={files[name].isActive}
        />
        <ListItemText>{name}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleDelete(name)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

FileList.propTypes = {
  files: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default FileList;