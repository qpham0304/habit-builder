import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getTasks, createTask, setTask, deleteTask, reset } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import { Button, TextField } from '@mui/material'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task)
  const [selectedTask, setSelectedTask] = useState(null)
  
  useEffect(() => {
    if(isError)
      console.log(message)
    if (!user) {
      navigate('/login')
    }
    dispatch(getTasks())
    return () => { 
      dispatch(reset()) 
    }
  }, [user, navigate, isError, dispatch])

  const addTask = () => {
    if(formInfo.task === '')
      toast.error('Please give a task name')
    else{
      dispatch(createTask(formInfo))
      setFormInfo((prevState) => defaultState)
      toast.success('Task added')
    }
  }

  const updateTask = () => {
    if(selectedTask === null)
      toast.error('No task was chosen')
    if(formInfo.task === '')
      toast.error('Please give a name to task before add')
    else{
      dispatch(setTask({id: selectedTask, tasks: formInfo}))
      setFormInfo((prevState) => defaultState)
      toast.success('Task updated')
    }
  }

  const removeTask = () => {
    if(selectedTask === null)
      toast.error('no task was chosen')
    else{
      dispatch(deleteTask(selectedTask))
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
      [e.target.name]: e.target.value
    }))
  }

  if(isLoading)
    return <LoadingSpinner/>

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Hello {user ? user.name : null}!</h3>
      <div style={{display : 'flex', gap: '2rem'}}>
        <Button onClick={addTask} className='btn'>Add Task</Button>
        <Button onClick={updateTask} className='btn'>Update Task</Button>
        <Button onClick={removeTask} className='btn'>Remove Task</Button>
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
        <br/>
        {tasks.tasks?
          <>
            {tasks.tasks.map(task => {
              return(<p className={selectedTask === task._id ? 'task-item active' : 'task-item'} onClick={() => setSelectedTask(task._id)} key={task._id}>{task.task}</p>)
            })}
          </>
        : null}
      </div>
    </div>
  )
}

export default Dashboard