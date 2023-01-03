import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button, Checkbox, FormControlLabel, Grid, styled, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import img from '../assets/images/103207318_p0.png'

function Register() {
  const [formInfo, setFormInfo] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, name, email, password, passwordConfirm } = formInfo
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== passwordConfirm) {
      toast.error('Passwords do not match')
    } else {
      const userData = { username, name, email, password }
      dispatch(register(userData))
    }
  }
  
  const onChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const FormButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }))

  if(isLoading)
    return <LoadingSpinner />

  return (
    <Stack
      display={'flex'}
      flexGrow={1}
      justifyContent={'flex-start'}
      alignItems={'center'}
      p={2}
      sx={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{ minWidth: '350px', width: { xs: '80%', sm: '60%', md: '30%' } }}
        className='glass-container'
        display={'flex'}
        flexDirection={'column'}
        gap='1rem'
        p={2}
      >
        <Typography  textAlign={'center'} variant='h5'>Register</Typography>
        <Typography textAlign={'center'}>Please create an account</Typography>
        <form style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }} onSubmit={onSubmit}>
          <Box sx={{display: 'flex', gap: '1rem'}}>
            <TextField
              variant='outlined'
              type='text'
              id='username'
              name='username'
              value={username}
              label='Username'
              onChange={onChange}
              fullWidth
            />
            <TextField
              variant='outlined'
              type='text'
              id='name'
              name='name'
              value={name}
              label='Name'
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              variant='outlined'
              type='email'
              id='email'
              name='email'
              value={email}
              label='Email'
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              variant='outlined'
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              label='Password'
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              variant='outlined'
              type='password'
              className='form-control'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              label='Confirm Password'
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box sx={{display : 'flex', justifyContent: 'flex-end', margin: '0 5px'}}>
            <Link style={{textDecoration: 'underline'}} to='/login'>Already have an account? Sign in</Link>
          </Box>
          <FormButton variant='contained' type='submit'>
            Submit
          </FormButton>
        </form>
      </Box>
    </Stack>
  )
}

export default Register