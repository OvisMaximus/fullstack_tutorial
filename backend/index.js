require('dotenv').config();
const express = require('express')
const morgan = require('morgan')

const mongodb = require('./services/mongodb.js')
mongodb.connect()

const notesApp = require('./notes_backend.js')
const phonebookApp = require('./phonebook_backend.js')


const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    //console.error(JSON.stringify(error))

    if (error.name === 'CastError') {
        console.error('malformatted id: ', error.message)
        response.status(400).json({error: 'malformatted id'}).end()
    } else if (error.name === 'ValidationError') {
        console.error('validation error: ', error.message)
        response.status(400).json({error: error.message }).end()
    } else {
        console.error('unknown error: ', error)
        response.status(500).end()
        next(error)
    }
}

app.use(express.json())
app.use(express.static('dist'))
morgan.token('request-json', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-json'))


app.get('/', (request, response) => {
    response.send('<h1>Hello Blasehase!</h1>')
})

notesApp.registerRoutesIn(app)
phonebookApp.registerRoutesIn(app)
app.use(unknownEndpoint)
app.use(errorHandler) // remember, has to be the last middleware!

const portNumber = process.env.PORT
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`)
})

