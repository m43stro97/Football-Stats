import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import '../../../App.css';

const Row = props => {

  const { index, style, round, onClick } = props;

  return (
    <ListItem button style={style} key={index} >
      <ListItemText primary={`Round ${round.title}`} onClick={onClick} />
    </ListItem>
  );
};
export default Row;
