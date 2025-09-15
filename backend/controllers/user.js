const usersRouter = require('express').Router()
const User = require('../models/user')
const userTools = require('../utils/userTools')

const createUser = async (request, response) => {
    const { username, name, password } = request.body

    if (!password) {
        response.status(400).json({
            error: 'password is missing',
        })
        return
    }
    if (password.length < 3) {
        response.status(400).json({
            error: 'password is shorter than the minimum allowed length: min length is 3',
        })
        return
    }
    const savedUser = await userTools.createUserInDb(username, name, password)

    response.status(201).json(savedUser)
}

const getAllUsers = async (request, response) => {
    // noinspection JSCheckFunctionSignatures
    const users = await User.find({}).populate('notes', {
        content: 1,
        important: 1,
    })
    response.json(users)
}
usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
module.exports = usersRouter
