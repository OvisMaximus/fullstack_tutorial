let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "phoneNumber": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "phoneNumber": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "phoneNumber": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "phoneNumber": "39-23-6423122"
    }
]
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
            response.write(`data: ${JSON.stringify({persons: persons})}\n\n`)
        } catch (error) {
            console.log('Failed to write to client, removing...')
            unregisterClient(response)
        }
    })
}

const createId = () => {
    const newRandomId = () => Math.floor(Math.random() * 100000000)
    let newId = newRandomId()
    while (persons.find(person => person.id === newId) ) {
        newId = newRandomId()
    }
    return newId
}

const deletePerson = (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    notifyClients()
    response.status(204).end()
}

const getPerson = (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        return response.json(person)
    }
    return response.status(404).end()
}
const getAllPersons = (request, response) => {
    response.json(persons)
}
const addPerson = (request, response) => {
    const body = request.body

    const name = body.name
    if (!name) {
        return response.status(400).json({error: 'name is missing'})
    }
    if (persons.find(person => person.name === name))
        return response.status(400).json({error: 'person already exists'})

    const phoneNumber = body.phoneNumber
    if (!phoneNumber) {
        return response.status(400).json({error: 'phoneNumber is missing'})
    }

    const id = createId()
    const newPerson = {"id": id.toString(), name, phoneNumber}

    persons.push(newPerson)
    response.json(newPerson)
    notifyClients()
}
const getStatusInfo = (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br/>${new Date().toString()}`)
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