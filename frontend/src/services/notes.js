import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

const authorizationHeader = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const create = (newObject, token) => {
  const request = axios.post(baseUrl, newObject, authorizationHeader(token))
  return request
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

const update = (id, newObject, token) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, authorizationHeader(token))
  return request
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export default { getAll, create, update }