import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import LoadingSpinner from './LoadingSpinner'

function CommingSoon() {
  const overlay = {
    position: 'fixed',
    top: '0',
    left: '0',
    background: '#c3c3c3',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5',
  }
  
  return (
    <Box p={3} >
      <Stack spacing={1}>
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='circular' width={60} height={60} />
        <Skeleton variant='rectangular' width={'45%'} height={60} />
        <Skeleton variant='rounded' width={'45%'} height={60} />
      </Stack>
      <br />
      <Box >
        <Skeleton sx={{ width: '60%' }} />
        <Skeleton sx={{ width: '50%' }} animation='wave' />
        <Skeleton sx={{ width: '80%' }} animation={false} />
      </Box>
      <br />
      <Box >
        <Skeleton sx={{ width: '50%' }} animation='wave' />
        <Skeleton sx={{ width: '80%' }} animation={false} />
        <Skeleton sx={{ width: '60%' }} />
      </Box>
      <Typography sx={overlay} variant='h3'>Comming Soon</Typography>
    </Box>
  )
}

export default CommingSoon