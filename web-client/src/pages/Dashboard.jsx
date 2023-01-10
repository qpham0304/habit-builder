import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTasks, createTask, deleteTask, reset } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import {
  Button,
  Skeleton,
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material'
import { Stack } from '@mui/system'
import TaskFormModal from '../components/TaskFormModal'
import { SearchOutlined } from '@mui/icons-material'
import WindowIcon from '@mui/icons-material/Window'
import GridOnIcon from '@mui/icons-material/GridOn'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TasksListing from '../components/TasksListing'
import FilterMenu from '../components/FilterMenu'
import { DataGrid } from '@mui/x-data-grid'

function LoadingSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant='text' height={20} />
      <Skeleton variant='text' height={20} />
      <Skeleton variant='text' height={20} />
      <Skeleton variant='rectangular' height={300} />
    </Stack>
  )
}

function TaskReport({ completedTasks, incompletedTasks }) {
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task)
  return (
    <Stack>
      {tasks.tasks ? (
        <>
          <Typography>Number of task: {tasks.tasks ? tasks.tasks.length : 0}</Typography>
          <Typography>Number of completed: {completedTasks.length}</Typography>
          <Typography>Number of completed: {incompletedTasks.length}</Typography>
          <LinearProgress
            color={'success'}
            variant='determinate'
            sx={{ height: '16px', borderRadius: '24px', width: '50%' }}
            value={(completedTasks.length * 100) / tasks.tasks.length} // normalize the value to fit the progress bar
            valueBuffer={100}
          />
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
  const completedTasks = tasks.tasks ? tasks.tasks.filter((task) => task.completed) : null
  const incompletedTasks = tasks.tasks ? tasks.tasks.filter((task) => !task.completed) : null
  const [selectedTask, setSelectedTask] = useState(null)
  const [action, setAction] = useState('action')
  const [viewMode, setViewMode] = useState('list')

  const defaultState = {
    task: '',
    description: '-',
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

  const removeTask = (task) => {
    if (task === null) toast.error('no task was chosen')
    else {
      dispatch(deleteTask(task._id))
      setSelectedTask(null)
      toast.success('Task removed')
    }
  }

  const rows = tasks.tasks
  const columns = [
    { field: 'task', width: '200' },
    { field: 'description', width: '200' },
    { field: 'completed', width: '200' },
    { field: 'time_taken', type: 'number', width: '200' },
    { field: 'tag', width: '200' },
    { field: 'createdAt', width: '200' },
  ]

  return (
    <Stack display={'flex'} flexGrow={1}>
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
            <FilterMenu />
            <IconButton onClick={() => setViewMode('list')} disableTouchRipple>
              <GridOnIcon />
            </IconButton>
            <IconButton onClick={() => setViewMode('table')} disableTouchRipple>
              <WindowIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      {viewMode === 'list' ? (
        <Stack p={1}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Complete ({completedTasks ? completedTasks.length : 0})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {tasks.tasks ? (
                <TasksListing
                  tasks={completedTasks}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  setFormInfo={setFormInfo}
                  handleOpen={handleOpen}
                  setAction={setAction}
                />
              ) : (
                <LoadingSkeleton />
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Incomplete ({completedTasks ? incompletedTasks.length : 0})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {tasks.tasks ? (
                <TasksListing
                  tasks={incompletedTasks}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  setFormInfo={setFormInfo}
                  handleOpen={handleOpen}
                  setAction={setAction}
                />
              ) : (
                <LoadingSkeleton />
              )}
            </AccordionDetails>
          </Accordion>
        </Stack>
      ) : null}
      {viewMode === 'table' ? (
        <Box height={600}>
          {tasks.tasks ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row._id}
              onSelectionModelChange={() => console.log('grid changes')}
            />
          ) : (
            <LoadingSkeleton />
          )}
        </Box>
      ) : null}
      <TaskFormModal
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        selectedTask={selectedTask}
        handleClose={handleClose}
        addTask={addTask}
        open={open}
        action={action}
      />
    </Stack>
  )
}

export default Dashboard
