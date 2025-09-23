import accessServiceAt from './crud.js'
const baseUrl = '/api/persons'
const personService = accessServiceAt(baseUrl)

export default personService
