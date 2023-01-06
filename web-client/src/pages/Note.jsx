import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

function Note() {
  return (
    <Stack>
      <Typography m={1} variant='h5'>Note</Typography>
      <Box>
        Note
      </Box>
    </Stack>
  )
}

export default Note