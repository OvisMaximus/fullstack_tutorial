const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const setResponseToFail = (response, code, reason) => {
    response.status(code).json({ error: reason }).end()
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    setResponseToFail(response, 404, 'unknown endpoint')
}

const validateRequestContainsDataInPostAndPut = (request, response, next) => {
    if (request.method !== 'POST' && request.method !== 'PUT') {
        next()
        return
    }
    if (!request.body || Object.keys(request.body).length === 0) {
        setResponseToFail(response, 400, 'request body must not be empty')
        return
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        setResponseToFail(response, 400, 'malformatted id')
    } else if (error.name === 'ValidationError') {
        setResponseToFail(response, 400, error.message)
    } else if (
        error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')
    ) {
        setResponseToFail(response, 400, 'expected `username` to be unique')
    } else if (error.name === 'JsonWebTokenError') {
        setResponseToFail(response, 401, 'token invalid')
    } else if (error.name === 'TokenExpiredError') {
        setResponseToFail(response, 401, 'token expired')
    } else {
        logger.error('unknown error: ', error)
        const status = error.statusCode || 500
        response.status(status).end()
        next(error)
    }
}

const decodeToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return null
    }
    return decodedToken
}

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = decodeToken(authorization.substring(7))
        if (!token) {
            response.status(401).json({ error: 'token invalid' }).end()
            return
        }
        request.token = token
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        setResponseToFail(response, 401, 'unauthorized access. login required')
        return
    }
    const user = await User.findById(request.token.id)
    if (user) {
        request.user = user
    } else {
        setResponseToFail(response, 401, 'unauthorized access. login required')
        return
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    validateRequestContainsDataInPostAndPut,
    tokenExtractor,
    userExtractor,
}
