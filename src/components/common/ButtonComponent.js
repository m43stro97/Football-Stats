import { Button } from '@material-ui/core';
import React from 'react';
import '../../App.css';

const ButtonComponent = ({title, onClick}) => {

  console.log();
  return (
    <div>
      <Button color="primary" onClick={onClick}>
        {title}
      </Button>
    </div>
  );
};
export default ButtonComponent;
