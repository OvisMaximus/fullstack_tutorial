import axios from 'axios'

const accessServiceAt = (baseUrl) => {
    const authorizationHeader = (token) => {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    }

    const get = async (id) => {
        const response = await axios.get(`${baseUrl}/${id}`)
        return response.data
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        console.log('getAll: ', response)
        return response.data
    }

    const create = (newObject, token) => {
        const request = token
            ? axios.post(baseUrl, newObject, authorizationHeader(token))
            : axios.post(baseUrl, newObject)
        return request.then((response) => response.data)
    }

    const update = async (updatedObject, token) => {
        console.log('crud update with ', updatedObject)
        if (token) {
            console.log('  using token ', token)
        }
        const response = token
            ? await axios.put(
                  `${baseUrl}/${updatedObject.id}`,
                  updatedObject,
                  authorizationHeader(token),
              )
            : await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
        console.log('crud update: ', response.data)
        return response.data
    }

    const deleteId = (id, token) => {
        const targetUrl = `${baseUrl}/${id}`
        console.log(`deleteId ${targetUrl} with token '${token}'`)
        const request = token
            ? axios.delete(targetUrl, authorizationHeader(token))
            : axios.delete(targetUrl)
        return request.then((response) => response.data)
    }

    return { get, getAll, create, update, deleteId }
}

export default accessServiceAt
