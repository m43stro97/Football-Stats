import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import '../../css/DenseAppBar.css';

import MenuAppBar from './MenuAppBar';

export default function DenseAppBar() {

  return (
    <div className='bar'>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Football Stats
          </Typography>
          <MenuAppBar />
        </Toolbar>
      </AppBar>
    </div>
  );
}
