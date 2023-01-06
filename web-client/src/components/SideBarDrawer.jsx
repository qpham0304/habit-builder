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
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBarDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const actionList_1 = ['Dashboard', 'Focus', 'Note', 'Todo']
  const IconList_1 = [<DashboardCustomizeIcon/>, <HourglassBottomRoundedIcon/>, <StickyNote2Icon/>, <FactCheckRoundedIcon/>]
  const actionList_2 = ['Progress', 'Weekly Report']
  const IconList_2 = [<PieChartRoundedIcon/>, <InsertChartRoundedIcon/>]
  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open)
  }

  

  const DrawerItem = () => {
    return (
      <Box sx={{ width: '250px' }} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <Typography textAlign={'center'} variant={'h5'} m={'1rem 0'}>
          Buidler
        </Typography>
        <List>
          {actionList_1.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(`/${text.toLowerCase()}`)}>
                <ListItemIcon>
                  {IconList_1[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {actionList_2.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(`/${text.toLowerCase()}`)}>
                <ListItemIcon>
                  {IconList_2[index]}
                </ListItemIcon>
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
