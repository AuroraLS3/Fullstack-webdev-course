import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { 'Authorization': 'bearer '+ window.localStorage.getItem('token') }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
  .catch(error => {
    throw error.response.data.error
  })
}

export default {getAll, create}