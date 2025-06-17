const Note = require("./services/notes_schema");

const addNote = (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        console.log('note saved!', savedNote)
        response.json(savedNote)
    })
}

const getAllNotes = (request, response) => {
    // noinspection JSCheckFunctionSignatures
    Note.find({}).then(notes => {
        response.json(notes)
    })
}

const getNote = (request, response, next) => {
    const id = request.params.id
    // noinspection JSCheckFunctionSignatures
    Note.findById(id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        }).catch(error => next(error))
}

const updateNote = (request, response, next) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.content) {
        response.status(400).json({
            error: 'content missing'
        })
        return
    }

    // noinspection JSCheckFunctionSignatures
    Note.findByIdAndUpdate(id, body, { new: true })
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
}

const deleteNote = (request, response, next) => {
    const id = request.params.id

    // noinspection JSCheckFunctionSignatures
    Note.findOneAndDelete(id)
        .then(_ => {
            response.status(204).end()
        })
        .catch(error => next(error))
}

function registerRoutesIn(app) {
    app.delete('/api/notes/:id', deleteNote)
    app.get('/api/notes/:id', getNote)
    app.get('/api/notes', getAllNotes)
    app.post('/api/notes', addNote)
    app.put('/api/notes/:id', updateNote)
}

module.exports = {registerRoutesIn}