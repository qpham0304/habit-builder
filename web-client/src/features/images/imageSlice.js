import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import imageService from './imageService'

const initialState = {
  images: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getImages = createAsyncThunk('image/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await imageService.getImages2(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteImage = createAsyncThunk('image/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await imageService.deleteImage(token, id)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getImages.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getImages.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.images = action.payload
    })
    .addCase(getImages.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.message = action.payload
    })
    .addCase(deleteImage.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteImage.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.images.images = state.images.images.filter((image) => image._id !== action.payload._id)
    })
    .addCase(deleteImage.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.message = action.payload
    })
  }
})
export const { reset } = imageSlice.actions
export default imageSlice.reducer