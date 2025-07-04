const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
require('../utils/http_status_code')
const OK = global.HttpStatus.OK.code
const BAD_REQUEST = global.HttpStatus.BAD_REQUEST.code
const UNAUTHORIZED = global.HttpStatus.UNAUTHORIZED.code

const loginUser = async (request, response) => {

    if (!request.body) {
        return response.status(BAD_REQUEST).json({
            error: 'request body missing'
        })
    }

    const { username, password } = request.body
    const user = await User.findOne({ username })

    if (user && ! user.passwordHash) {
        return response.status(BAD_REQUEST).json({
            error: 'user exists but no password set'
        })
    }

    if (! password) {
        return response.status(BAD_REQUEST).json({
            error: 'no password provided'
        })
    }

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(UNAUTHORIZED).json({
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
        .status(OK)
        .json({ token, username: user.username, name: user.name })
}

loginRouter.post('/', loginUser)

module.exports = loginRouter