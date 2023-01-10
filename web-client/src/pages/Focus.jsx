import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { Button, Box, Modal, Typography, Stack, Skeleton, styled, List, ListItemButton, Checkbox, IconButton } from '@mui/material'
import FlipNumbers from 'react-flip-numbers'
import TaskItem from '../components/TaskItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTasks, reset } from '../features/tasks/taskSlice'
import {EditIcon, PlayArrowIcon} from '../assets/icons/MuiIcons'
import {PauseIcon} from '../assets/icons/MuiIcons';

function TimerCounter(props) {
  const { autoStart, expiryTimestamp, sessionLength } = props
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
    autoStart,
    expiryTimestamp,
    onExpire: () => alert('Session ended'),
  })

  const reset = () => {
    const time = new Date()
    time.setSeconds(time.getSeconds() + sessionLength)
    restart(time)
    pause()
  }

  return (
    <Stack sx={{ gap: '1rem', textAlign: 'center' }}>
      <Typography variant='h5'>Focus Timer</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          fontFamily: 'helvetica',
          fontSize: '30px',
        }}
      >
        <FlipNumbers
          height={50}
          width={45}
          color='#007aff'
          play={true}
          perspective={300}
          numbers={`${days < 10 ? '0' : ''}${days}`}
        />
        <span style={{ fontSize: '2.5rem', color: '#007aff' }}>:</span>
        <FlipNumbers
          height={50}
          width={45}
          color='#007aff'
          play={true}
          perspective={300}
          numbers={`${hours < 10 ? '0' : ''}${hours}`}
        />
        <span style={{ fontSize: '2.5rem', color: '#007aff' }}>:</span>
        <FlipNumbers
          height={50}
          width={45}
          color='#007aff'
          play={true}
          perspective={300}
          numbers={`${minutes < 10 ? '0' : ''}${minutes}`}
        />
        <span style={{ fontSize: '2.5rem', color: '#007aff' }}>:</span>
        <FlipNumbers
          height={50}
          width={45}
          color='#007aff'
          play={true}
          perspective={300}
          numbers={`${seconds < 10 ? '0' : ''}${seconds}`}
        />
      </Box>
      <Typography>{isRunning ? 'Stay Focus' : 'Session ended'}</Typography>
      <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Button variant='contained' color='primary' onClick={resume}>
          Resume
        </Button>
        <Button variant='contained' color='primary' onClick={pause}>
          Pause
        </Button>
        <Button variant='contained' color='primary' onClick={reset}>
          Restart
        </Button>
      </Box>
    </Stack>
  )
}

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

function Focus() {
  const time = new Date()
  const [sessionLength, setSessionLength] = useState(1500)
  time.setSeconds(time.getSeconds() + sessionLength)
  const [focus, setFocus] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task)
  const user = useSelector((state) => state.auth.user)
  const [focusTasks, setFocusTasks] = useState({ length: Number, task_name: String })
  const [selectedTask, setSelectedTask] = useState(null)

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

  const StyledListItem = styled(ListItemButton)({
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // width: '100%',
    // padding: '0 1rem',
    '& > div': {display: 'flex', flexDirection: 'row', alignItems: 'center', visibility: 'visible', gap: '8px'},
    // '& > p': {display: 'flex', flexGrow: '1', flexBasis:'100%'},

  })
      
  return (
    <Stack display={'flex'} alignItems={'center'}>
      <button onClick={() => console.log(tasks)}>asdas</button>
      <Box mt={'5rem'}>
        <TimerCounter autoStart={false} expiryTimestamp={time} sessionLength={sessionLength} />
      </Box>
      <Stack m={2} sx={{ width: '65%', height: '50vh', border: '1px solid black', overflowY: 'auto' }}>
        <List>
          {tasks.tasks ? (
            tasks.tasks.map((task) => {
              return (
                <StyledListItem disableTouchRipple selected={selectedTask === task ? true : null}>
                  <Box>
                    <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.task}
                    </Typography>
                    <Typography overflow={'ellipsis'}>{task.description}</Typography>
                    <Typography>{task.time_taken}</Typography>
                    <Typography>{task.tag}</Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size='small'
                      disableTouchRipple
                      sx={{ background: '#ececec11' }}
                      onClick={() => setSelectedTask(task)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      disableTouchRipple
                      sx={{ background: '#ececec11' }}
                      onClick={() => setSelectedTask(task)}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Box>
                </StyledListItem>
              )
            })
          ) : (
            <LoadingSkeleton />
          )}
        </List>
      </Stack>
    </Stack>
  )
}

export default Focus
