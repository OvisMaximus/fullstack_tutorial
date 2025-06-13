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

const portNumber = process.env.PORT
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`)
})

