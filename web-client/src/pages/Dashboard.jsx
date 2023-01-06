import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getTasks, createTask, setTask, deleteTask, reset } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import { Button, Skeleton, styled, Typography, Box, ListItem, List, IconButton, TextField, InputAdornment, Toolbar, Checkbox } from '@mui/material'
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Stack } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskButton from '../components/AddTaskButton'
import TaskFormModal from '../components/TaskFormModal'
import { SearchOutlined } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid';
import WindowIcon from '@mui/icons-material/Window';
import GridOnIcon from '@mui/icons-material/GridOn';

function LoadingSkeleton() {
  <Stack spacing={1}>
    <Skeleton variant='text' height={20} />
    <Skeleton variant='text' height={20} />
    <Skeleton variant='text' height={20} />
    <Skeleton variant='rectangular' height={300} />
  </Stack>
}

function TaskReport({completedTasks, incompletedTasks}) {
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task)
  return (
    <Stack>
      {tasks.tasks ? (
        <>
          <Typography>Number of task: {tasks.tasks ? tasks.tasks.length : 0}</Typography>
          <Typography>Number of completed: {completedTasks.length}</Typography>
          <Typography>Number of completed: {incompletedTasks.length}</Typography>
        </>
      ) : (
        <LoadingSkeleton />
      )}
    </Stack>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task)
  const completedTasks = tasks.tasks ? (tasks.tasks.filter((task) => task.completed)) : null
  const incompletedTasks = tasks.tasks ? (tasks.tasks.filter((task) => !task.completed)) : null
  const [selectedTask, setSelectedTask] = useState(null)
  const [action, setAction] = useState('action')

  const defaultState = {
    task: 'N/A',
    description: 'N/A',
    completed: false,
    time_taken: Number,
    tag: '-',
  }
  const [formInfo, setFormInfo] = useState(defaultState)

  const [open, setOpen] = React.useState(false)
  
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const StyledListItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 1rem',
    '& > div': {display: 'flex', alignItems: 'center'},
    '& > p': {display: 'flex', flexGrow: '1', flexBasis:'100%'},
  })

  const TaskItem = (props) => {
    const { task } = props
    return (
      <StyledListItem>
        <Typography sx={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.task}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>{task.time_taken}</Typography>
        <Typography>{task.tag}</Typography>
        <Typography>{task.updatedAt}</Typography>
        <Box>
          <IconButton onClick={() => {setFormInfo(task); handleOpen(); setAction('update')}} disableTouchRipple><EditIcon/></IconButton>
          <IconButton onClick={() => removeTask(task)} disableTouchRipple><DeleteIcon/></IconButton>
        </Box>
      </StyledListItem>
    )
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
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
      handleClose()
    }
  }

  const updateTask = () => {
    if (selectedTask === null) toast.error('No task was chosen')
    if (formInfo.task === '') toast.error('Please give a name to task before update')
    else {
      dispatch(setTask({ id: selectedTask._id, tasks: formInfo }))
      setFormInfo((prevState) => defaultState)
      toast.success('Task updated')
      handleClose()
    }
  }

  const removeTask = (task) => {
    if (task === null) toast.error('no task was chosen')
    else {
      dispatch(deleteTask(task._id))
      setSelectedTask(null)
      toast.success('Task removed')
    }
  }

  const onChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onChecked = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      completed: e.target.checked
    }))
  }

  const updateTag = (e, newTag) => {
    setFormInfo((prevState) => ({
      ...prevState,
      tag: newTag
    }))
  }

  const rows = tasks.tasks
  const columns = [
    { field: 'task', width: '200', },
    { field: 'description', width: '200', },
    { field: 'completed', width: '200', },
    { field: 'time_taken', type: 'number', width: '200', },
    { field: 'tag', width: '200', },
    { field: 'createdAt', width: '200', },
  ];

  return (
    <Stack m={1}>
      <h2>Dashboard</h2>
      <h3>Hello {user ? user.name : null}!</h3>
      <Box sx={{ display: 'flex', gap: '2rem', '& > div:last-of-type': { marginLeft: 'auto', marginRight: '2rem' } }}>
        <Button
          onClick={() => {
            handleOpen()
            setAction('add')
          }}
          variant='contained'
        >
          Add Task
        </Button>
        <Button
          onClick={() => {
            if (selectedTask === null) {
              toast.error('no task was selected')
            } else {
              handleOpen()
              setAction('update')
              setFormInfo(selectedTask)
              console.log(formInfo)
            }
          }}
          variant='contained'
        >
          Update Task
        </Button>
        <Button onClick={() => removeTask(selectedTask)} variant='contained'>
          Remove Task
        </Button>
        <TextField
          placeholder='Search'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          variant='standard'
        />
      </Box>
      <Box m={2}>
        <TaskReport completedTasks={completedTasks} incompletedTasks={incompletedTasks} />
      </Box>
      <Toolbar variant='dense' sx={{ margin: '0', padding: '0', border: '1px solid gray' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography>View mode</Typography>
          <Box>
            <IconButton disableTouchRipple>
              <GridOnIcon />
            </IconButton>
            <IconButton disableTouchRipple>
              <WindowIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Box>
        <Typography variant='h5'>Complete</Typography>
        {tasks.tasks ? (
          <List>
            {completedTasks.map((task) => {
              return (
                <ListItem
                  onClick={() => {
                    setSelectedTask(task)
                  }}
                  key={task._id}
                  disableGutters
                  className={selectedTask === task ? 'task-item active' : 'task-item'}
                >
                  {/* <Checkbox checked={task.completed} /> */}
                  <TaskItem task={task} />
                </ListItem>
              )
            })}
          </List>
        ) : (
          <LoadingSkeleton />
        )}
      </Box>
      <Box>
        <Typography variant='h5'>Incomplete</Typography>
        {tasks.tasks ? (
          <List>
            {incompletedTasks.map((task) => {
              return (
                <ListItem
                  onClick={() => {
                    setSelectedTask(task)
                  }}
                  key={task._id}
                  disableGutters
                  className={selectedTask === task ? 'task-item active' : 'task-item'}
                >
                  {/* <Checkbox checked={task.completed} /> */}
                  <TaskItem task={task} />
                </ListItem>
              )
            })}
          </List>
        ) : (
          <LoadingSkeleton />
        )}
      </Box>
      {/* <Box>
        {tasks.tasks ? (
          <List>
            {tasks.tasks.map((task) => {
              return (
                <ListItem
                  onClick={() => {
                    setSelectedTask(task)
                  }}
                  key={task._id}
                  disableGutters
                  className={selectedTask === task ? 'task-item active' : 'task-item'}
                >
                  <Checkbox checked={task.completed} />
                  <TaskItem task={task} />
                </ListItem>
              )
            })}
          </List>
        ) : (
          // <DataGrid
          //   rows={rows}
          //   columns={columns}
          //   pageSize={5}
          //   rowsPerPageOptions={[5]}
          //   checkboxSelection
          //   getRowId={row => row._id}
          // />
          <LoadingSkeleton />
        )}
      </Box> */}
      <TaskFormModal
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        selectedTask={selectedTask}
        onChange={onChange}
        updateTag={updateTag}
        handleClose={handleClose}
        addTask={addTask}
        updateTask={updateTask}
        removeTask={removeTask}
        open={open}
        action={action}
        onChecked={onChecked}
      />
    </Stack>
  )
}

export default Dashboard
