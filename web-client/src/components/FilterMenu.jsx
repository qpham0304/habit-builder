import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, useTheme } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector } from 'react-redux'

export default function ProfileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Completed</MenuItem>
        <MenuItem onClick={handleClose}>Incompleted</MenuItem>
        <MenuItem onClick={handleClose}>Tags</MenuItem>
        <MenuItem onClick={handleClose}>Date</MenuItem>
        <MenuItem onClick={handleClose}>Name</MenuItem>
      </Menu>
    </>
  )
}
