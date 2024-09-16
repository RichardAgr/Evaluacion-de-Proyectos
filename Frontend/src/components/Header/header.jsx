import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


function Header() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [grupo] = React.useState(true);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Utiliza CustomAppBar en lugar de AppBar */}
      <AppBar position="static">
        <Toolbar>
          {grupo ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h5>WEB TIS</h5>
          </Typography>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
              >
                <NotificationsNoneIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountBoxIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

