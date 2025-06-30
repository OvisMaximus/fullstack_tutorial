const logger = require('./logger')

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


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}