import accessServiceAt from './crud'
const baseUrl = 'http://localhost:3001/api/blogs'
const blogService = accessServiceAt(baseUrl)

export default blogService
