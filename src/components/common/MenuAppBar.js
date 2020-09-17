import { Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/DenseAppBar.css';

export default function MenuAppBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => {
    if (value === 1) {
      history.push('/');
    }
    setAnchorEl(null);
  };

  return (
    <div className="menuButton">
      <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose(1)} >
          Home
        </MenuItem>
      </Menu>
    </div>
  );
}
