import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    color: 'var(--colorR)',
    '&$checked': {
      color: 'var(--colorR)',
    },
  },
  checked: {},
};

const FileList = ({ files, classes, handleToggle, handleDelete }) => (
  <List>
    {Object.keys(files).map(name => (
      <ListItem
        key={name}
        button
        disableRipple
        color={files[name].color}
        style={{ '--colorR': files[name].color }}
        onClick={() => handleToggle(name)}
      >
        <Checkbox
          disableRipple
          color="default"
          classes={{
            root: classes.root,
            checked: classes.checked,
          }}
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
  handleDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(FileList);
