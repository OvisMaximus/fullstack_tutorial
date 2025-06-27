const Note = require('../models/note')

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true
    }
]

const initDatabase = async () => {
    await Note.deleteMany({})
    // noinspection JSUnresolvedReference
    await Note.insertMany(initialNotes)
}

const nonExistingId = async () => {
    const note = new Note({ content: 'willRemoveThisSoon' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDb = async () => {
    // noinspection JSCheckFunctionSignatures
    const notes = await Note.find({})
    // noinspection JSUnresolvedReference
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialNotes, initDatabase, nonExistingId, notesInDb
}