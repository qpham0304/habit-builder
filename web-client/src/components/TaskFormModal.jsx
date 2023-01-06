import React from 'react'
import {
  Button,
  Modal,
  TextField,
  styled,
  Typography,
  Box,
  Stack,
  Checkbox,
  Autocomplete,
  useTheme,
} from '@mui/material'
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';


function TaskFormModal(props) {
  const { formInfo, setFormInfo, selectedTask, onChange, updateTag, handleClose, addTask, updateTask, removeTask, open, action, onChecked } = props
  const theme = useTheme()
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    // height: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '5px 15px 5px 15px',
    '& > div': {
      display: 'flex',
      alignItems: 'center'
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Stack sx={modalStyle} component='form' noValidate autoComplete='off'>
          {/* <Typography>{selectedTask ? selectedTask.task : null}</Typography> */}
          <Box>
            <TextField
              name='task'
              label='Task name'
              onChange={onChange}
              variant='standard'
              InputLabelProps={{ shrink: true }}
              fullWidth
              defaultValue={action === 'update' ? (selectedTask ? selectedTask.task : null) : null}
            />
            <Autocomplete
              disablePortal
              options={['art', 'leetcode', 'japanese', 'daily', 'job apply']}
              sx={{ width: 200, marginLeft: '1rem' }}
              onChange={updateTag}
              renderInput={(params) => <TextField {...params} name='tag' label='Tag' variant='standard'/>}
            />
          </Box>
          <Box>
            <TextField
              name='description'
              label='Description'
              multiline
              fullWidth
              minRows={5}
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              defaultValue={action === 'update' ? (selectedTask ? selectedTask.description : null) : null}
            />
          </Box>
          <Box>
            <Typography
              sx={{ color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light }}
            >
              Complete:
            </Typography>
            <Checkbox color={'success'} onChange={onChecked}/>
            <TextField
              sx={{ marginLeft: '1rem' }}
              name='time_taken'
              label='Time taken'
              onChange={onChange}
              variant='standard'
              InputLabelProps={{ shrink: true }}
              defaultValue={action === 'update' ? (selectedTask ? selectedTask.time_taken : null) : null}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }} p={'1rem 0'}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={action === 'add' ? addTask : updateTask}>{action}</Button>
          </Box>
        </Stack>
      </Fade>
    </Modal>
  )
}

export default TaskFormModal