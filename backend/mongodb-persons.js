const mongoose = require('mongoose')

const dbPasswd = process.env.MONGODB_DBPASSWORD;
if (!dbPasswd) {
    console.error('please provide mongodb dbPasswd as environment variable "MONGODB_DBPASSWORD"');
    process.exit(1)
}
const url = `mongodb+srv://laurawetterwachs:${dbPasswd}@fullstacktutorial.3rn4lnq.mongodb.net/fullstackTutorial?retryWrites=true&w=majority&appName=fullstackTutorial`;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)

const listPersons = () => {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.phoneNumber}`);
        })
        mongoose.connection.close()
    })
}

const addNewPerson = (name, phoneNumber) => {
    const person = new Person({
        name,
        phoneNumber,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length <= 2) {
    listPersons()
} else if (process.argv.length <= 4) {
    const name = process.argv[2];
    const phoneNumber = process.argv[3];
    addNewPerson(name, phoneNumber)
} else {
    console.error("please provide name and number to add a person")
}


