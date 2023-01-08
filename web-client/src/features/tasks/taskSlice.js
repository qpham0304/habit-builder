import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getTasks = createAsyncThunk('tasks/getTasks', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.getTasks(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createTask = createAsyncThunk('tasks/createTask', async (task, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.createTask(token, task)  
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const setTask = createAsyncThunk('tasks/updateTask', async (task, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.setTask(token, task.id, task.tasks)  
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.deleteTask(token, id)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(setTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.tasks = state.tasks.tasks.map((task) => {
          if (task._id !== action.payload._id) return task
          else return action.payload
        })
      })
      .addCase(setTask.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.tasks = state.tasks.tasks.filter((task) => task._id !== action.payload._id)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
  },
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer