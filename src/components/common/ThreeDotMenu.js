import { ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

export default function ThreeDotMenu({ menuItems }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div><IconButton
      aria-label="more"
      id="long-button"
      aria-controls={open ? 'long-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
    >
      <MoreVert />
    </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        {menuItems.map(({
          onClick,
          text,
          icon,
        }) => (
          <MenuItem
            key={text}
            onClick={async () => {
              await onClick();
              handleClose();
            }}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
