import { Stack, Typography, Box, Paper, Button, Avatar, IconButton, TextField, InputBase } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KeyIcon from '@mui/icons-material/Key';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getImages, deleteImage, reset } from '../features/images/imageSlice'
import LoadingSpinner from '../components/LoadingSpinner';


function Profile() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const API_URL = '/images/'
  const [img, setImg] = useState('')
  const imgState = useSelector((state) => state.image)
  const [selectedImage, setSelectedImage] = useState({_id: '63b8fc9d276aa872854fd0e7', b64: null})

  const uploadImage = (e) => {
    console.log(e.target.files)
    setImg(e.target.files[0])
  }

  const postImage = () => {
    const formData = new FormData()
    formData.append('image', img)
    axios.post(`${API_URL}/upload`, formData, config).then(res => {console.log(res); console.log(img._id)}).catch(err => console.log(err))
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }

  // useEffect(() => {
  //   if(imgState.isError)
  //     console.log(imgState.message)
  //   dispatch(getImages())
  //   return () => {
  //     dispatch(reset())
  //   }
  // }, [])

  if(imgState.isLoading)
    return <LoadingSpinner />

  return (
    <Stack display='flex' flexGrow={1} alignItems='center' m={'3rem 0'}>
      <Paper sx={{ minHeight: '300px', width: '50%', padding: '1rem', boxShadow: '12' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            // src={imgState.images ? `data:image/jpeg;base64, ${selectedImage.b64}` : null}
            src={imgState.images && imgState.images.images.length > 0 ? `data:image/jpeg;base64, ${imgState.images.images[0].b64}` : null}
          />
          <Typography variant='h4' m={2}>
            Profile
          </Typography>
          <input type='file' name='file' onChange={uploadImage} />
          <Button onClick={postImage}>Submit image</Button>
        </Box>
        <div>
          {imgState.images
            ? imgState.images.images.map((image) => {
                return (
                  <div key={image._id} onClick={() => setSelectedImage(image)}>
                    {image._id}
                  </div>
                )
              })
            : null}
            <button onClick={() => dispatch(deleteImage(selectedImage._id))}>click</button>
        </div>
        <Box mt={'24px'}>
          <Typography variant='h6'>id: {user._id}</Typography>
          <Typography variant='h6'>email: {user.email}</Typography>
          <Typography variant='h6'>name: {user.name}</Typography>
          <Typography variant='h6'>username: {user.username ? user.name : 'N/A'}</Typography>
          <Typography variant='h6'>
            password: <InputBase type='password' value={'************************'} />
          </Typography>
        </Box>
        <Button>Change Password</Button>
        <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
          <Button>Discard Changes</Button>
          <Button>Save</Button>
        </Box>
      </Paper>
    </Stack>
  )
}

export default Profile