import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

function Welcome() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    if(user)
      navigate('/dashboard')
    else
      navigate('/login')
  })

  return (
    <Box display={'flex'} flexGrow={1} justifyContent={'center'} alignItems={'center'}>
      <LoadingSpinner />
    </Box>
  )
}

export default Welcome