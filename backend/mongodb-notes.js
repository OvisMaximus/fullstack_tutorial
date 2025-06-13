const mongoose = require('mongoose')


const dbPasswd = process.env.MONGODB_DBPASSWORD;
if (!dbPasswd) {
    console.error('please provide mongodb dbPasswd as environment variable "MONGODB_DBPASSWORD"');
    process.exit(1)
}
const url = `mongodb+srv://laurawetterwachs:${dbPasswd}@fullstacktutorial.3rn4lnq.mongodb.net/fullstackTutorial?retryWrites=true&w=majority&appName=fullstackTutorial`;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
    content: 'Mongoose makes things easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
*/
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})