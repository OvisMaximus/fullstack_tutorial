const usersRouter = require('express').Router()
const User = require('../models/user')
const userTools = require('../utils/userTools')

const createUser = async (request, response) => {
    const { username, name, password } = request.body

    const savedUser = await userTools.createDbRecord(username, name, password)

    response.status(201).json(savedUser)
}

const getAllUsers = async (request, response) => {
    // noinspection JSCheckFunctionSignatures
    const users = await User.find({}).populate('notes', { content: 1, important: 1 })
    response.json(users)
}
usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
module.exports = usersRouter