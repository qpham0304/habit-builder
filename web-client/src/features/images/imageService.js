import axios from 'axios'

const API_URL = '/images/'

const getImages2 = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/view2`, config)
  return response.data
}

const uploadImage = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/view2`, config)
  return response.data
}

const deleteImage = async(token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${id}`, config)
  return response.data
}

const imageService = { getImages2, uploadImage, deleteImage}

export default imageService