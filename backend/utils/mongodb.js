const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

function connect() {
    mongoose.set('strictQuery', false)
    if (! config.MONGODB_URI) {
        logger.error('MongoDB URI is missing, please define DB_URL')
    } else {
        mongoose.connect(config.MONGODB_URI, {})
            .then(() => logger.info('Connected to mongodb'))
            .catch(err => logger.error('Error connecting to mongodb:', err))
    }
}

module.exports = { connect }
