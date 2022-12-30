import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button, styled, TextField } from '@mui/material'
import { theme } from '../theme'

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
      //TODO: resolve incorrect username or password request
      dispatch(login(userData))
    }
  }
  
  const onChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const FormButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.black.main,
    color: '#fff',
  }))

  if(isLoading)
    return <LoadingSpinner />

  return (
    <>
      <section className='heading'>
        <h1>
          Login
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <TextField
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              label='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <TextField
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              label='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <FormButton variant='contained' color='primary' type='submit'> submit </FormButton>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login