require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.DB_URL
if (!url) {
    console.error('please provide mongodb url as environment variable "DB_URL"');
    process.exit(1)
}

mongoose.set('strictQuery',false)

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)

const listPersons = () => {
    console.log("phonebook:")
    // noinspection JSCheckFunctionSignatures
    Person.find({}).then(async result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.phoneNumber}`);
        })
        await mongoose.connection.close()
    })
}

const addNewPerson = (name, phoneNumber) => {
    const person = new Person({
        name,
        phoneNumber,
    })

    person.save().then(async _ => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`)
        await mongoose.connection.close()
    })
}

const main = async () => {
    await mongoose.connect(url)
    if (process.argv.length <= 2) {
        listPersons()
    } else if (process.argv.length <= 4) {
        const name = process.argv[2];
        const phoneNumber = process.argv[3];
        addNewPerson(name, phoneNumber)
    } else {
        console.error("please provide name and number to add a person")
    }
}
main().catch(console.error)


