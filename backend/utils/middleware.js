const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const validateRequestContainsDataInPostAndPut = (request, response, next) => {
    if (request.method !== 'POST' && request.method !== 'PUT') {
        next()
        return
    }
    if ( ! request.body || Object.keys(request.body).length === 0) {
        response.status(400).json({ error: 'request body must be a JSON object' }).end()
        return
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        logger.error('malformatted id: ', error.message)
        response.status(400).json({ error: 'malformatted id' }).end()
    } else if (error.name === 'ValidationError') {
        logger.error('validation error: ', error.message)
        response.status(400).json({ error: error.message }).end()
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' }).end()
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' }).end()
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }
    else {
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
        const user = await User.findById(token.id)
        if (user) {
            request.userId = user.id
        } else {
            request.userId = null
        }
    } else {
        request.token = null
        request.userId = null
    }
    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    validateRequestContainsDataInPostAndPut,
    tokenExtractor
}