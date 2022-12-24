import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'

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
      <section className='heading'>
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              placeholder='Enter your username'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register