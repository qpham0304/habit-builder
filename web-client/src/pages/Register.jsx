import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button, FormGroup, TextField } from '@mui/material'

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
      const userData = {
        username, name, email, password,
      }
      console.log(userData)
      dispatch(register(userData))
    }
  }
  
  const onChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <section>
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section >
        <form onSubmit={onSubmit}>
          <div>
            <TextField
              variant='outlined'
              type='text'
              id='username'
              name='username'
              value={username}
              label='Username'
              onChange={onChange}
            />
          </div>
          <div>
            <TextField
              variant='outlined'
              type='text'
              id='name'
              name='name'
              value={name}
              label='Name'
              onChange={onChange}
            />
          </div>
          <div>
            <TextField
              variant='outlined'
              type='email'
              id='email'
              name='email'
              value={email}
              label='Email'
              onChange={onChange}
            />
          </div>
          <div>
            <TextField
              variant='outlined'
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              label='name'
              onChange={onChange}
            />
          </div>
          <div>
            <TextField
              variant='outlined'
              type='password'
              className='form-control'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              label='Confirm Password'
              onChange={onChange}
            />
          </div>
          <div>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register