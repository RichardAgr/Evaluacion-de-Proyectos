import { Drawer, Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import ReportIcon from '@mui/icons-material/Report';

// eslint-disable-next-line react/prop-types
function HamburgesaDocente({ open, toggleDrawer }) {
  const navigate = useNavigate(); 

  const menuItems = [
    { text: 'Visualizar Planificaciones', icon: <AssignmentIcon />, path: '/noTieneNada' },
    { text: 'Seguimiento Semanal', icon: <CalendarTodayIcon />, path: '/seguimiento-semanal' },
    { text: 'Lista de Estudiantes', icon: <PeopleIcon />, path: '/homeDocente/listaEstudiantes' },
    { text: 'Lista de Grupo-Empresas', icon: <GroupIcon />, path: '/homeDocente/listaEmpresas' },
    { text: 'Calificaciones', icon: <StarIcon />, path: '/calificaciones' },
    { text: 'Reportes', icon: <ReportIcon />, path: '/reportes' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      <Box sx={{ width: 250 }}>
        <Typography variant="h6" sx={{ padding: '16px', backgroundColor: '#114093', color: 'white' }}>
          Herramientas
        </Typography>

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default HamburgesaDocente;
