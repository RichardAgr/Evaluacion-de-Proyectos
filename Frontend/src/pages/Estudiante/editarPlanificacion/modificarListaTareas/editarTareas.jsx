import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Button,
  TextField,
  Fab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  taskList: {
    padding: theme.spacing(2),
  },
  taskItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: '8px',
    backgroundColor: '#CFD4E1',
    color: 'black',
    '&:hover': {
      backgroundColor: '#3e8e41',
    },
  },
  addButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    padding: theme.spacing(2),
  },
}));

const TaskList = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditedTask(tasks[index]);
    setOpenDialog(true);
  };

  const handleSaveTask = () => {
    if (editedTask !== null) {
      const newTasks = tasks.map((task, i) => {
        if (i === tasks.indexOf(editedTask)) {
          return newTask;
        }
        return task;
      });
      setTasks(newTasks);
      setEditedTask(null);
      setOpenDialog(false);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.taskList}>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} className={classes.taskItem}>
            <Button
              variant="contained"
              fullWidth
              style={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                height: '100%',
                whiteSpace: 'normal',
                textTransform: 'none',
                fontSize: '18px',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#CFD4E1',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#3e8e41',
                },
              }}
            >
              {task}
            </Button>
            <IconButton onClick={() => handleEditTask(index)}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <TextField
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Agregar tarea"
        fullWidth
      />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addButton}
        onClick={handleAddTask}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={openDialog}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar tarea</DialogTitle>
        <DialogContent>
          <TextField
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            placeholder="Editar tarea"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCancel} color="primary">
            <CancelIcon />
          </MuiButton>
          <MuiButton onClick={handleSaveTask} color="primary">
            <SaveIcon />
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;