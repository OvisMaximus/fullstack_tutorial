import accessServiceAt from './crud'
const baseUrl = 'http://localhost:3001/api/notes'
const noteService = accessServiceAt(baseUrl)

export default noteService
