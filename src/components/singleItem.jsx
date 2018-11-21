import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = () => ({
  link: {
    color: 'black',
    textDecoration: 'none',
  },
});

class SingleItem extends Component {
  state = {};
  render() {
    const { classes, url, id, text, onEdit, onDelete } = this.props;

    return (
      <NavLink className={classes.link} to={url}>
        <ListItem button>
          <ListItemText primary={text} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit">
              <EditIcon onClick={e => onEdit(e, id)} />
            </IconButton>
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={e => onDelete(e, id)} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </NavLink>
    );
  }
}

export default withStyles(styles)(SingleItem);