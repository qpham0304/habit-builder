import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Button } from '@mui/material'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className='header'>
      <Link to='/'>
        <Button>Dashboard</Button>
      </Link>
      {user ? (
        <Button className='btn' onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <ul>
          <li>
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <Button>Register</Button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header
