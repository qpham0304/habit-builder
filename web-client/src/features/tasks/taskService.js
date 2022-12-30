import axios from "axios";

const API_URL = '/tasks/'

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
    // .then((res) => res)
    // .then((res) => setTasks(res.data.tasks))
    // .catch((err) => console.log(err))
  return response.data
}

const createTask = async (token, task) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, task, config)
  return response.data
}

const setTask = async (token, id, task) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`${API_URL}${id}`, task, config)
  return response.data
}

const deleteTask = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(`${API_URL}${id}`, config)
  return response.data
}

const taskService = { getTasks, createTask, setTask, deleteTask }

export default taskService