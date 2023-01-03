import React from 'react'
import {
  styled,
  Grid,
  Box,
  Link,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Avatar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './Login'
import Register from './Register'
import img from '../assets/images/103207318_p0.png'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function SignIn() {
  const [page, setPage] = useState('login')
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formInfo
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  const FormButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }))

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') alert('missing required field')
    else {
      const userData = { email, password }
      dispatch(login(userData)) //TODO: resolve incorrect username or password request
    }
  }

  const onChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* <Grid display={'flex'} flex={3}
        sx={{
          display: {xs: 'none', sm: 'block'},
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid display={'flex'} flex={2}>
        {page === 'login' ? <Login /> : <Register />}
      </Grid> */}
      <Grid
        display={'flex'}
        flexDirection={'row'}
        flex={1}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box display={'flex'} flex={2} sx={{ display: { xs: 'none', sm: 'block' } }} />
        <Box className='glass-container' display={'flex'} flex={1} flexDirection={'column'} gap='1rem' p={2}>
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '0 5px' }}>
              <Link style={{ textDecoration: 'underline' }} to='/register'>
                Register
              </Link>
              <Link style={{ textDecoration: 'underline' }} to='/register'>
                Forgot Password
              </Link>
            </Box>
            <FormButton variant='contained' color='primary' type='submit'>
              Sign In
            </FormButton>
          </form>
        </Box>
      </Grid>

      {/* <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} display={'flex'} flex={1}>
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
      </Grid> */}
    </Grid>
  )
}

export default SignIn
