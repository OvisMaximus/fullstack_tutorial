import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog, token) => {
    console.log('create blog with ', newBlog)
    console.log('token ', token)
    const response = await axios.post(baseUrl, newBlog, {headers: {Authorization: `bearer ${token}`}})
    return response.data
}

export default {getAll, create}
