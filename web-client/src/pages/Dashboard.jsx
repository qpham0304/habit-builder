import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getTasks, createTask, setTask, deleteTask, reset } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import { Button, Modal, Skeleton, TextField, styled, Typography, Box, Paper, Checkbox, ListItem, List, ListItemButton, ListItemIcon, IconButton } from '@mui/material'
import { Stack } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskButton from '../components/AddTaskButton'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task)
  const [selectedTask, setSelectedTask] = useState(null)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    boxShadow: 24,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    p: 5,
  }

  const formArea = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: '1rem',
  }

  const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
 
  const StyledListItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 1rem',
  })

  const TaskItem = (props) => {
    const { task } = props
    return (
      <StyledListItem>
        <Typography >{task.task}</Typography>
        <Box>
          <IconButton onClick={openModal} disableTouchRipple><EditIcon/></IconButton>
          <IconButton onClick={removeTask}disableTouchRipple><DeleteIcon/></IconButton>
        </Box>
      </StyledListItem>
    )
  }

  useEffect(() => {
    if (isError) console.log(message)
    if (!user) {
      navigate('/')
    }
    dispatch(getTasks())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, dispatch])

  const addTask = () => {
    if (formInfo.task === '') toast.error('Please give a task name')
    else {
      dispatch(createTask(formInfo))
      setFormInfo((prevState) => defaultState)
      toast.success('Task added')
    }
  }

  const updateTask = () => {
    if (selectedTask === null) toast.error('No task was chosen')
    if (formInfo.task === '') toast.error('Please give a name to task before add')
    else {
      dispatch(setTask({ id: selectedTask._id, tasks: formInfo }))
      setFormInfo((prevState) => defaultState)
      toast.success('Task updated')
    }
  }

  const removeTask = () => {
    if (selectedTask === null) toast.error('no task was chosen')
    else {
      dispatch(deleteTask(selectedTask._id))
      setSelectedTask(null)
      toast.success('Task removed')
    }
  }

  const defaultState = {
    task: '',
    completed: Boolean,
    time_taken: Number,
    tag: String,
  }
  const [formInfo, setFormInfo] = useState(defaultState)

  const onChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const openModal = () => {
    setOpen(true)
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {/* <h3>Hello {user ? user.name : null}!</h3> */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Button onClick={addTask} className='btn'>
          Add Task
        </Button>
        <Button onClick={updateTask} className='btn'>
          Update Task
        </Button>
        <Button onClick={removeTask} className='btn'>
          Remove Task
        </Button>
        <Button onClick={openModal}>open modal</Button>
      </div>
      <div>
        <TextField
          type='text'
          className='form-control'
          id='task'
          name='task'
          value={formInfo.task}
          label='Enter your task'
          onChange={onChange}
          variant='standard'
        />
        <br />
        {tasks.tasks ? (
          <List>
            {tasks.tasks.map((task) => {
              return (
                <ListItem
                  onClick={() => setSelectedTask(task)}
                  onDoubleClick={openModal}
                  key={task._id}
                  disableGutters
                  className={selectedTask === task ? 'task-item active' : 'task-item'}
                >
                  {/* {task.task} */}
                  <TaskItem task={task}/>
                </ListItem>
              )
            })}
          </List>
        ) : (
          <Stack spacing={1}>
            <Skeleton variant='text' height={20} />
            <Skeleton variant='text' height={20} />
            <Skeleton variant='text' height={20} />
            <Skeleton variant='rectangular' height={300} />
          </Stack>
        )}
      </div>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Paper sx={style}>
          <Typography variant='h5'>{selectedTask ? selectedTask.task : null}</Typography>
          <Stack>
            <Typography>Task name:</Typography>
            <TextField
              type='text'
              className='form-control'
              id='taskname'
              name='taskname'
              label='Task name'
              InputLabelProps={{ shrink: true }}
              inputProps={{
                sx: {
                  '&::placeholder': {
                    color: 'green',
                  },
                },
              }}
              // onChange={onChange}
              variant='standard'
            />
          </Stack>
          {/* <Stack>
            <Typography>Tag:</Typography>
            <TextField
              type='text'
              className='form-control'
              id='tag'
              name='tag'
              value={formInfo.task}
              label='Tag'
              InputLabelProps={{ shrink: true }}
              inputProps={{
                sx: {
                  '&::placeholder': {
                    color: 'green',
                  },
                },
              }}
              onChange={onChange}
              variant='standard'
            />
          </Stack> */}
          {/* <Stack>
            <Typography>Time Taken:</Typography>
            <TextField
              type='text'
              className='form-control'
              id='timetaken'
              name='timetaken'
              value={formInfo.task}
              label='Time taken'
              InputLabelProps={{ shrink: true }}
              inputProps={{
                sx: {
                  '&::placeholder': {
                    color: 'green',
                  },
                },
              }}
              onChange={onChange}
              variant='standard'
            />
          </Stack> */}
          <Stack sx={formArea}>
            <Typography>Status:</Typography>
            {/* <Checkbox/> */}
            <Typography>completed</Typography>
          </Stack>
        </Paper>
      </StyledModal>
      <AddTaskButton />
    </div>
  )
}

export default Dashboard
