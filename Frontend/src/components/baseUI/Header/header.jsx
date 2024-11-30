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
import Cookies from 'js-cookie';
import { useState, lazy, Suspense } from 'react';
import { decrypt } from '../../../api/decrypt';
const HamburgesaDocente = lazy(() => import('../../Hamburgesa/hamburgesaDocente'));
const HamburgesaEstudiante = lazy(() => import('../../Hamburgesa/hamburgesaEstudiante'));

function Header() {
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [grupo] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => {
    setOpen(open);
  };
  
  const logout = async () => {
      try {
          await fetch('http://localhost:8000/api/logout', {
              method: 'POST',
              headers: {
                  'Authorization': true,
              },
              credentials: 'include'
          });
          Cookies.remove('random', { path: '/' });
          Cookies.remove('laravel_sesion', { path: '/' });
          localStorage.clear();
        window.location.reload();  
      } catch (error) {
          console.error('Error al cerrar sesión:', error);
      }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const random = Cookies.get('random');
  const role = decrypt(random);
  return (
    <Box >
      <AppBar position="fixed">
        <Toolbar>
          {grupo ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
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
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      <Suspense >
        {role==='docente'?
          <HamburgesaDocente open={open} toggleDrawer={toggleDrawer} />
          :role==='estudiante'?
          <HamburgesaEstudiante open={open} toggleDrawer={toggleDrawer} />
          :
          <></>
        }
      </Suspense>
    </Box>
  );
}

export default Header;

