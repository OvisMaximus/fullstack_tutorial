import accessServiceAt from './crud'
const baseUrl = 'http://localhost:3001/api/anecdotes'
const anecdoteService = accessServiceAt(baseUrl)

export default anecdoteService
