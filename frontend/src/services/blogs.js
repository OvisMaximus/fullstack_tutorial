import axios from 'axios'
//const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog, token) => {
    console.log('create blog with ', newBlog)
    console.log('token ', token)
    const response = await axios.post(baseUrl, newBlog, {
        headers: { Authorization: `bearer ${token}` },
    })
    return response.data
}

const update = async (modifiedBlog) => {
    console.log('update blog with ', modifiedBlog)
    const response = await axios.put(
        `${baseUrl}/${modifiedBlog.id}`,
        modifiedBlog,
    )
    return response.data
}

const remove = async (id, token) => {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: `bearer ${token}` },
    })
}

export default { getAll, create, update, remove }
