import React from 'react'
import { Typography, styled, Box, IconButton, useTheme, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = (props) => {
  const { task, setFormInfo, handleOpen, setAction } = props
  const date = task.updatedAt.split('T')
  const time = date[1].substring(0, 8)
  const dispatch = useDispatch()
  const theme = useTheme()
  const StyledListItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 1rem',
    '& > div': {display: 'flex', flexDirection: 'row', alignItems: 'center', visibility: 'hidden', gap: '8px'},
    '& > p': {display: 'flex', flexGrow: '1', flexBasis:'100%'},
    '&:hover': {
      '& > div': {visibility: 'visible'},
    }
  })

  const StyledListCard = styled(Paper)({
    padding: '1rem',
    // display: 'flex',
    // justifyContent: 'column',
    background: 'transparent',
    width: '100%',
  })

  return (
    // <StyledListItem>
    //   <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.task}</Typography>
    //   <Typography overflow={'ellipsis'}>{task.description}</Typography>
    //   <Typography>{task.time_taken}</Typography>
    //   <Typography>{task.tag}</Typography>
    //   <Typography>
    //     {date[0]} at {time}
    //   </Typography>
    //   <Box>
    //     <IconButton
    //       color='info'
    //       sx={{ padding: 0 }}
    //       size='medium'
    //       onClick={() => {
    //         setFormInfo(task)
    //         handleOpen()
    //         setAction('update')
    //       }}
    //       disableTouchRipple
    //     >
    //       <EditIcon />
    //     </IconButton>
    //     <IconButton
    //       color='error'
    //       sx={{ padding: 0 }}
    //       size='medium'
    //       onClick={() => dispatch(deleteTask(task._id))}
    //       disableTouchRipple
    //     >
    //       <DeleteIcon />
    //     </IconButton>
    //   </Box>
    // </StyledListItem>
    <StyledListCard elevation={9}>
      <Box display={'flex'} justifyContent='space-between'>
        <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }} variant='h6'>name: {task.task}</Typography>
        <Box display={'flex'} gap={'0.5rem'}>
          <IconButton
            color='info'
            sx={{ padding: 0 }}
            size='medium'
            onClick={() => {
              setFormInfo(task)
              handleOpen()
              setAction('update')
            }}
            disableTouchRipple
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='error'
            sx={{ padding: 0 }}
            size='medium'
            onClick={() => dispatch(deleteTask(task._id))}
            disableTouchRipple
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography overflow={'ellipsis'}>description: {task.description}</Typography>
      <Typography>time_taken: {task.time_taken}</Typography>
      <Typography>tag:  {task.tag}</Typography>
      <Typography mt={2} textAlign={'end'} variant='subtitle1' color={theme.palette.text.secondary}>
        Last Updated: {date[0]} at {time}
      </Typography>
    </StyledListCard>
  )
}

export default TaskItem