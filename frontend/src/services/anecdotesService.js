import crud from './crud'
const baseUrl = 'http://localhost:3001/api/anecdotes'

const get = async (id) => {
    return await crud.get(baseUrl, id)
}

const getAll = async () => {
    return await crud.getAll(baseUrl)
}

const create = (newObject, token) => {
    return crud.create(baseUrl, newObject, token)
}

const update = (id, newObject, token) => {
    return crud.update(baseUrl, id, newObject, token)
}

const deleteId = (id, token) => {
    return crud.deleteId(baseUrl, id, token)
}

export default { get, getAll, create, update, deleteId }
