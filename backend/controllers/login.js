const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

const loginUser = async (request, response) => {

    if (!request.body) {
        return response.status(400).json({
            error: 'request body missing'
        })
    }

    const { username, password } = request.body
    const user = await User.findOne({ username })

    if (user && ! user.passwordHash) {
        return response.status(400).json({
            error: 'user exists but no password set'
        })
    }

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    )

    response
        .status(200)
        .json({ token, username: user.username, name: user.name })
}

loginRouter.post('/', loginUser)

module.exports = loginRouter