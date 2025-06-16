import Person from "./services/person_schema.js";

let clients = []

const registerClient = (response) => {
    clients.push(response)
}

const unregisterClient = (response) => {
    const index = clients.indexOf(response)
    if (index > -1) {
        clients.splice(index, 1)
        console.log(`Client removed. Active clients: ${clients.length}`)
    }
}

const notifyClients = () => {
    clients.forEach((response) => {
        try {
            console.log('notify client')
            // noinspection JSCheckFunctionSignatures
            Person.find({}).then(persons => {
                response.write(`data: ${JSON.stringify({persons: persons})}\n\n`)
            })
        } catch (error) {
            console.log('Failed to write to client, removing...')
            unregisterClient(response)
        }
    })
}

const deletePerson = (request, response) => {
    const id = request.params.id

    Person.findByIdAndDelete(id, {lean:true}).then(()=>{
        notifyClients()
        response.status(204).end()
    }).catch(_ => {
        response.status(404).end()
    })

}

const getPerson = (request, response) => {
    const id = request.params.id
    // noinspection JSCheckFunctionSignatures
    Person.findById(id)
            .then(person => {
                response.json(person)
            }).catch(_ => {
            response.status(404).end()
        })
}
const getAllPersons = (request, response) => {
    // noinspection JSCheckFunctionSignatures
    Person.find({}).then(persons => {
        response.json(persons)
    })
}
const addPerson = (request, response) => {
    const body = request.body

    const name = body.name
    if (!name) {
        return response.status(400).json({error: 'name is missing'})
    }

    const phoneNumber = body.phoneNumber
    if (!phoneNumber) {
        return response.status(400).json({error: 'phoneNumber is missing'})
    }

// TODO prevent storing a person as new if a person with the same name exists already => return response.status(400).json({error: 'person already exists'})

    const person = new Person({name, phoneNumber})

    person.save().then(savedPerson => {
        console.log('person saved!', savedPerson)
        response.json(savedPerson)
        notifyClients()
    })


}
const getStatusInfo = (request, response) => {
    // noinspection JSCheckFunctionSignatures
    Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length} people<br/>${new Date().toString()}`)
    })
}

const provideUpdates = (request, response) => {
    console.log('provideUpdates')
    response.setHeader('Content-type', 'text/event-stream')
    response.setHeader('Cache-Control', 'no-cache')
    response.setHeader('Connection', 'keep-alive')

    request.on('close', () => {
        console.log('Client disconnected')
        unregisterClient(response)
    })

    request.on('aborted', () => {
        console.log('Client aborted connection')
        unregisterClient(response)
    })

    registerClient(response)
}

function registerRoutesIn (app) {
    app.get('/api/persons/updates', provideUpdates)
    app.delete('/api/persons/:id', deletePerson)
    app.get('/api/persons/:id', getPerson)
    app.get('/api/persons', getAllPersons)
    app.post('/api/persons', addPerson)
    app.get('/info', getStatusInfo)
}

export {registerRoutesIn}