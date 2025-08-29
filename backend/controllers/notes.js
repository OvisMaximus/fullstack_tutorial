const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
require('../utils/http_status_code')
const { userExtractor } = require('../utils/middleware')

const OK = global.HttpStatus.OK.code
const CREATED = global.HttpStatus.CREATED.code
const BAD_REQUEST = global.HttpStatus.BAD_REQUEST.code
const NO_CONTENT = global.HttpStatus.NO_CONTENT.code
const FORBIDDEN = global.HttpStatus.FORBIDDEN.code
const NOT_FOUND = global.HttpStatus.NOT_FOUND.code

const addNote = async (request, response) => {
    const loggedInUser = User(request.user)
    const body = request.body
    if (!body.content) {
        response.status(BAD_REQUEST).json({ error: 'request body missing' }).end()
        return
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: loggedInUser.id
    })

    const savedNote = await note.save()
    loggedInUser.notes = loggedInUser.notes.concat(savedNote.id)
    await loggedInUser.save()

    response.status(CREATED).json(savedNote)
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
        response.status(NOT_FOUND).end()
    }
}

const updateNote = async (request, response) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.content) {
        response.status(BAD_REQUEST).json({
            error: 'content missing'
        })
        return
    }

    // noinspection JSCheckFunctionSignatures
    const note = await Note.findById(id)

    if( ! note.user.equals(request.user._id)) {
        response.status(FORBIDDEN).json({ error: 'authenticated user is not owner' }).end()
        return
    }

    note.set(body)
    note.user = request.user._id
    const savedNote = await note.save()

    response.status(OK).json(savedNote)
}

const deleteNote = async (request, response) => {
    const id = request.params.id

    // noinspection JSCheckFunctionSignatures
    const note = await Note.findById(id)

    if( ! note.user.equals(request.user._id)) {
        response.status(FORBIDDEN).json({ error: 'authenticated user is not owner' }).end()
        return
    }

    await note.deleteOne()
    response.status(NO_CONTENT).end()
}

notesRouter.delete('/:id', userExtractor, deleteNote)
notesRouter.get('/:id', getNote)
notesRouter.put('/:id', userExtractor, updateNote)
notesRouter.get('/', getAllNotes)
notesRouter.post('/', userExtractor, addNote)

module.exports = notesRouter