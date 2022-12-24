import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

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
      <Link to='/'>Dashboard</Link>
      {user ? (
        <button className='btn' onClick={onLogout}>
          Logout
        </button>
      ) :
        <ul>
          <li> <Link to='/login'> Login </Link> </li>
          <li> <Link to='/register'> Register </Link> </li>
        </ul>
      }
    </nav>
  )
}

export default Header