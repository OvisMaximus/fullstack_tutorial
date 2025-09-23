const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongodb = require('./utils/mongodb.js')
const middleware = require('./utils/middleware')
const testingRouter = require('./controllers/testing.js')
const loginRouter = require('./controllers/login.js')
const notesRoutes = require('./controllers/notes.js')
const personsRouter = require('./controllers/persons.js')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const anecdotesRouter = require('./controllers/anecdotes')

mongodb.connect()

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('request-json', function (req) {
    return JSON.stringify(req.body)
})
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :request-json',
        {
            skip: (req) => req.baseUrl.search(/\/login/) !== -1,
        },
    ),
)
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    app.use(middleware.requestLogger)
}
if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter)
}
app.use(middleware.validateRequestContainsDataInPostAndPut)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRoutes)
app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/anecdotes', anecdotesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) // remember, has to be the last middleware!

module.exports = app
