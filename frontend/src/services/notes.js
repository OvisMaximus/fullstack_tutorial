import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
//const baseUrl = '/api/notes'

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

// for dummy backend
const createNew = async (content) => {
    const note = { content, important: false }
    const response = await axios.post(baseUrl, note)
    return response.data
}

const authorizationHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}

// for real backend
const create = (newObject, token) => {
    const request = axios.post(baseUrl, newObject, authorizationHeader(token))
    return request
        .then((response) => response.data)
        .catch((error) => {
            throw error
        })
}

const update = (id, newObject, token) => {
    const request = axios.put(
        `${baseUrl}/${id}`,
        newObject,
        authorizationHeader(token),
    )
    return request
        .then((response) => response.data)
        .catch((error) => {
            throw error
        })
}

export default { get, getAll, createNew, create, update }
