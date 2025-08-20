import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log('anecdoteService.getAll: ', response)
    return response.data
}

export default { getAll }
