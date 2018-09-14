import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const FileList = ({ items }) => (
  <List>
    {items.map(item => (
      <ListItem 
        key={item.id}
        button
        disableRipple
      >
        <Checkbox disableRipple />
        <ListItemText>{item.name}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))};
  </List>
);

export default FileList;