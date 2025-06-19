require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.DB_URL
if (!url) {
    console.error('please provide mongodb url as environment variable "DB_URL"')
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
        console.log('note saved!')
        await mongoose.connection.close()
    })

}

const listNotes = () => {
    // noinspection JSCheckFunctionSignatures
    Note.find({}).then(async result => {
        result.forEach(note => {
            console.log(note)
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
        console.error('please provide name and number to add a person')
    }
}
main().catch(console.error)