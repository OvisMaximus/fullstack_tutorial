const Note = require("./services/notes_schema");

const addNote =  (request, response) => {
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

const getNote = (request, response) => {
    const id = request.params.id
    // noinspection JSCheckFunctionSignatures
    Note.findById(id)
        .then(note => {
            response.json(note)
        }).catch(_ => {
            response.status(404).end()
        })
}

const updateNote = (request, response) => {
    const body = request.body
    const id = request.params.id

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // noinspection JSCheckFunctionSignatures
    Note.findByIdAndUpdate(id, body, {new: true}).then(savedNote => {
        response.json(savedNote)
    }).catch(err => {
        response.status(404).json({
            error: 'no note found with id ' + id + " " + JSON.stringify(err)
        })
    })
}

const deleteNote = (request, response) => {
    const id = request.params.id

    Note.deleteOne({ _id: id })

    response.status(204).end()
}

function registerRoutesIn (app) {
    app.delete('/api/notes/:id', deleteNote)
    app.get('/api/notes/:id', getNote)
    app.get('/api/notes', getAllNotes)
    app.post('/api/notes', addNote)
    app.put('/api/notes/:id', updateNote)
}

module.exports = {registerRoutesIn}