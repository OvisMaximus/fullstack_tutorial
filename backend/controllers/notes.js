const notesRouter = require('express').Router()
const Note = require('../models/note')
const logger = require('../utils/logger')

const addNote = (request, response, next) => {
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

    note.save()
        .then(savedNote => {
            logger.info('note saved!', savedNote)
            response.json(savedNote)
        })
        .catch(error => next(error))
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
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
}

notesRouter.delete('/:id', deleteNote)
notesRouter.get('/:id', getNote)
notesRouter.put('/:id', updateNote)
notesRouter.get('/', getAllNotes)
notesRouter.post('/', addNote)

module.exports = notesRouter