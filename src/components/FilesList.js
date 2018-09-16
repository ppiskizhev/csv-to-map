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

import styled from 'styled-components';

const StyledListItem = styled(ListItem)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 6px;
    background-color: ${props => props.color};
  }
`;

const FileList = ({ files, classes, handleToggle, handleDelete }) => (
  <List>
    {Object.keys(files).map(name => (
      <StyledListItem 
        key={name}
        button
        disableRipple
        color={files[name].color}
        onClick={() => handleToggle(name)}
      >
        <Checkbox 
          disableRipple
          color='default'
          checked={files[name].isActive}
        />
        <ListItemText>{name}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={() => handleDelete(name)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </StyledListItem>
    ))}
  </List>
);

FileList.propTypes = {
  files: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default FileList;