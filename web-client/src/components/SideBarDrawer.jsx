import React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'

export default function SideBarDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const actionList_1 = ['Dashboard', 'Focus', 'Note', 'Todo']
  const IconList_1 = []
  const actionList_2 = ['Progress', 'Weekly Report']
  const IconList_2 = []
  const toggleDrawer = (open) => (event) => {
    console.log(open)
    setDrawerOpen(open)
  }

 const DrawerItem = () => {
  return (
    <Box sx={{ width: '250px' }} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Typography textAlign={'center'} variant={'h5'} m={'1rem 0'}>Buidler</Typography>
      <List>
        {actionList_1.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon><InboxIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {actionList_2.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon><MailIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
 }

  return (
    <>
      <IconButton sx={{ color: 'white' }} onClick={toggleDrawer(true)} disableTouchRipple>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer anchor={'left'} open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <DrawerItem />
      </SwipeableDrawer>
    </>
  )
}
