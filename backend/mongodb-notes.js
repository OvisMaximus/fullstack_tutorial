require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const url = process.env.TEST_DB_URL
if (!url) {
    logger.error('please provide mongodb url as environment variable "TEST_DB_URL"')
    process.exit(1)
}

mongoose.set('strictQuery',false)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const addNewNote = (content, important) => {
    const note = new Note({
        content,
        important
    })

    note.save().then(async () => {
        logger.info('note saved!')
        await mongoose.connection.close()
    })

}

const listNotes = () => {
    // noinspection JSCheckFunctionSignatures
    Note.find({}).then(async result => {
        result.forEach(note => {
            logger.info(note)
        })
        await mongoose.connection.close()
    })
}

const main = async () => {
    await mongoose.connect(url)
    if (process.argv.length <= 2) {
        listNotes()
    } else if (process.argv.length <= 4) {
        const content = process.argv[2]
        const important = process.argv[3]
        addNewNote(content, important)
    } else {
        logger.error('please provide name and number to add a person')
    }
}
main().catch(logger.error)