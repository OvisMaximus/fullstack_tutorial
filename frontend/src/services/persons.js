import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://fullstack-tutorial-wyek.onrender.com/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteId = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const registerAutoUpdateForPersons = (setPersons) => {
    console.log('registerAutoUpdateForPersons')
    const eventSource = new EventSource(`${baseUrl}/updates`)
    eventSource.onmessage = (event) => {
        console.log('autoUpdateForPersons', event.data)
        const data = JSON.parse(event.data)
        setPersons(data.persons)
    }
    return () => eventSource.close()
}

export default {getAll, create, update, deleteId, registerAutoUpdateForPersons}