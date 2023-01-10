import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, styled, Switch, ToggleButton, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ProfileMenu(props) {
  const { onLogout, mode, setMode, imageSource } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { user } = useSelector((state) => state.auth)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const StyledListItemButton = styled(ListItemButton)({
    // background: '#112233',
    padding: '1rem',
    width: '200px',
    [theme.breakpoints.up('sm')]: { width: '300px',},
  })

  return (
    <>
      <Avatar
        sx={{ width: 36, height: 36 }}
        src={imageSource}
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }} m={'0.5rem 1rem'}>
          <Avatar
            sx={{ width: 50, height: 50 }}
            src={imageSource}
          />
          <Box>
            <Typography variant='h6'>{user.name}</Typography>
            <Typography variant='subtitle1' color={theme.palette.text.secondary}>
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} sx={{ marginLeft: '1rem' }} alignItems='center' p={1}>
          <Typography>Dark Mode: {mode === 'dark' ? 'On' : 'Off'}</Typography>
          <Box display={'flex'} alignItems={'center'} marginLeft={'auto'}>
            <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} />
            <ListItemIcon>{mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}</ListItemIcon>
          </Box>
        </Box>
        <Divider />
        <StyledListItemButton
          onClick={() => {
            handleClose()
            navigate('/profile')
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          Profile
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            handleClose()
            navigate('/reports')
          }}
        >
          <ListItemIcon>
            <SignalCellularAltIcon />
          </ListItemIcon>
          Report
        </StyledListItemButton>
        <Divider />
        <StyledListItemButton onClick={handleClose}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          Notification
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            handleClose()
            navigate('/profile')
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Settings
        </StyledListItemButton>
        <StyledListItemButton onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </StyledListItemButton>
      </Menu>
    </>
  )
}
