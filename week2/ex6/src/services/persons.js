import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, id)
}

export default { getAll, create, update, remove }