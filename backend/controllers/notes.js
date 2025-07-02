const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const addNote = async (request, response) => {
    const body = request.body
    if (!body.content) {
        response.status(400).json({ error: 'request body missing' }).end()
        return
    }

    const user = await User.findById(request.userId)
    if (!user) {
        response.status(401).end()
        return
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote.id)
    await user.save()

    response.status(201).json(savedNote)
}

const getAllNotes = async (request, response) => {
    // noinspection JSCheckFunctionSignatures
    const allNotes = await Note
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(allNotes)
}

const getNote = async (request, response) => {
    const id = request.params.id
    // noinspection JSCheckFunctionSignatures
    const note = await Note
        .findById(id)
        .populate('user', { username: 1, name: 1 })
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
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

const deleteNote = async (request, response) => {
    const id = request.params.id

    // noinspection JSCheckFunctionSignatures
    await Note.findByIdAndDelete(id)
    response.status(204).end()
}

notesRouter.delete('/:id', deleteNote)
notesRouter.get('/:id', getNote)
notesRouter.put('/:id', updateNote)
notesRouter.get('/', getAllNotes)
notesRouter.post('/', addNote)

module.exports = notesRouter