import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { AppBar, Button, IconButton, List, ListItem, Toolbar, Typography, styled, Avatar, Box, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import ProfileMenu from './ProfileMenu'
import SideBarDrawer from './SideBarDrawer'
import MenuIcon from '@mui/icons-material/Menu';

const StyledLink = styled(Link)({
  color: '#fff',
})

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0',
  padding: '0',
})

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
  // [theme.breakpoints.up('sm')]: { display: 'none' },
}))

function Header(props) {
  const { mode, setMode } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <AppBar sx={{ bgcolor: 'seagreen' }} position='sticky'>
      <StyledToolbar variant='dense'>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <SideBarDrawer />
          <StyledLink to='/dashboard'>Dashboard</StyledLink>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          {user ? (
            <>
              <UserBox>
                <ProfileMenu mode={mode} setMode={setMode} onLogout={onLogout} />
              </UserBox>
            </>
          ) : (
            <>
              <StyledLink to='/login'>login</StyledLink>
              <StyledLink to='/register'>register</StyledLink>
            </>
          )}
        </Box>
      </StyledToolbar>
    </AppBar>
  )
}

export default Header
