const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const createUser = async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
}

const getAllUsers = async (request, response) => {
    // noinspection JSCheckFunctionSignatures
    const users = await User.find({})
    response.json(users)
}
usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
module.exports = usersRouter