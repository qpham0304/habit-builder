import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button, Grid, styled, TextField, Typography } from '@mui/material'
import { theme } from '../theme'
import { Box, Stack } from '@mui/system'
import img from '../assets/images/103207318_p0.png'

function Login() {
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email, password } = formInfo
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
    if(email === '' || password === '')
      alert('missing required field')
    else {
      const userData = { email, password }
      dispatch(login(userData)) //TODO: resolve incorrect username or password request
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
        <Typography sx={{ margin: '1rem' }} textAlign={'center'} variant='h5' mt={5}>
          Login
        </Typography>
        <form style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }} onSubmit={onSubmit}>
          <Box>
            <TextField
              type='email'
              id='email'
              name='email'
              value={email}
              label='Enter your email'
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              type='password'
              id='password'
              name='password'
              value={password}
              label='Enter password'
              onChange={onChange}
              fullWidth
            />
          </Box>
          <Box sx={{display : 'flex', justifyContent: 'space-between', margin: '0 5px'}}>
            <Link style={{textDecoration: 'underline'}} to='/register'>Register</Link>
            <Link style={{textDecoration: 'underline'}} to='/register'>Forgot Password</Link>
          </Box>
          <FormButton variant='contained' color='primary' type='submit'>
            Sign In
          </FormButton>
        </form>
      </Box>
    </Stack>
  )
}

export default Login