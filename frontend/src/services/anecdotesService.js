import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log('anecdoteService.getAll: ', response)
    return response.data
}

const create = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const update = async (updatedAnecdote) => {
    console.log('update anecdote with ', updatedAnecdote)
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
}

export default { get, getAll, create, update }
