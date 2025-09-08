import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log('anecdoteService.getAll: ', response)
    return response.data
}
const authorizationHeader = token => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const create = async (newAnecdote, token) => {
    console.log('create anecdote with ', newAnecdote, authorizationHeader(token))
    const response = await axios.post(baseUrl, newAnecdote, authorizationHeader(token))
    return response.data
}

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const update = async (updatedAnecdote, token) => {
    console.log('update anecdote with ', updatedAnecdote, authorizationHeader(token))
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return response.data
}

export default { get, getAll, create, update }
