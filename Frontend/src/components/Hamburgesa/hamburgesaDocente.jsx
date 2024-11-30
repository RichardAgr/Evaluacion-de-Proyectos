import { Drawer, Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import ReportIcon from '@mui/icons-material/Report';

// eslint-disable-next-line react/prop-types
function HamburgesaDocente({ open, toggleDrawer }) {
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
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Visualizar Planificaciones" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Seguimiento Semanal" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Estudiantes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Grupo-Empresas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Calificaciones" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default HamburgesaDocente;
