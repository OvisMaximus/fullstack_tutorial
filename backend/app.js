const express = require('express')
const morgan = require('morgan')
const mongodb = require('./utils/mongodb.js')
const middleware = require('./utils/middleware')
const notesRoutes = require('./controllers/notes.js')
const personsRouter = require('./controllers/persons.js')

mongodb.connect()

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('request-json', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-json'))

app.use('/api/notes', notesRoutes)
app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) // remember, has to be the last middleware!

module.exports = app

