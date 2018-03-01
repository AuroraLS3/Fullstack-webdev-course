import axios from 'axios'
const baseUrl = '/api/login'

const login = async (msCredentials) => {
    const response = await axios.post(baseUrl, msCredentials)
    return response.data
}

export default {login}