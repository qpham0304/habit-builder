import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, styled, Switch, ToggleButton, Typography } from '@mui/material'
import { Box } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export default function ProfileMenu(props) {
  const { onLogout, mode, setMode } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  // const [mode, setMode] = React.useState('light')
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const StyledListItemButton = styled(ListItemButton)({
    // background: '#112233',
    padding: '1rem',
    width: '300px',
  })

  return (
    <>
      <Avatar
        sx={{ width: 36, height: 36 }}
        src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1cb8913b-6f11-4a1d-ad27-1020e0600352/dfl83r2-d205fdca-ae03-4524-bf1c-94d9374693b6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFjYjg5MTNiLTZmMTEtNGExZC1hZDI3LTEwMjBlMDYwMDM1MlwvZGZsODNyMi1kMjA1ZmRjYS1hZTAzLTQ1MjQtYmYxYy05NGQ5Mzc0NjkzYjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZPremC3ANI4CffSEb8zPpAIFUKbiPiM4wp4aNu9D_PM'
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
        <ListItem disableGutters sx={{marginLeft: '1rem'}}>
          <Typography>Dark Mode: {mode === 'dark' ? 'On' : 'Off'}</Typography>
          <Box display={'flex'} alignItems={'center'} marginLeft={'auto'}>
            <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} />
            <ListItemIcon>{mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}</ListItemIcon>
          </Box>
        </ListItem>
        <Divider />
          <StyledListItemButton onClick={handleClose}>
            <ListItemIcon><PersonIcon/></ListItemIcon>
            Profile
          </StyledListItemButton>
          <StyledListItemButton onClick={handleClose}>
            <ListItemIcon><SignalCellularAltIcon/></ListItemIcon>
            Report
          </StyledListItemButton>
          <Divider />
          <StyledListItemButton onClick={handleClose}>
            <ListItemIcon><NotificationsIcon/></ListItemIcon>
            Notification
          </StyledListItemButton>
          <StyledListItemButton onClick={handleClose}>
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            Settings
          </StyledListItemButton>
          <StyledListItemButton onClick={onLogout}>
            <ListItemIcon><LogoutIcon/></ListItemIcon>
            Logout
          </StyledListItemButton>
      </Menu>
    </>
  )
}
