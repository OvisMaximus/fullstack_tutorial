const mongoose = require('mongoose')
const url = process.env.DB_URL

function connect() {
    mongoose.set('strictQuery', false)
    if (! url) {
        console.error('MongoDB URI is missing, please define DB_URL')
    } else {
        mongoose.connect(url)
            .then(() => console.log('Connected to mongodb'))
            .catch(err => console.error('Error connecting to mongodb:', err))
    }
}

module.exports = { connect }
