import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import taskReducer from '../features/tasks/taskSlice'
import imageReducer from '../features/images/imageSlice'
export const store = configureStore({
  reducer: { 
    auth: authReducer,
    task: taskReducer,
    image: imageReducer,
   },
});
