const personsRouter = require('express').Router()
const Person = require('../models/person.js')
const logger = require('../utils/logger')

let clients = []

const registerClient = (response) => {
    clients.push(response)
}

const unregisterClient = (response) => {
    const index = clients.indexOf(response)
    if (index > -1) {
        clients.splice(index, 1)
        logger.info(`Client removed. Active clients: ${clients.length}`)
    }
}

const notifyClients = () => {
    clients.forEach((response) => {
        try {
            logger.info('notify client')
            // noinspection JSCheckFunctionSignatures
            Person.find({}).then((persons) => {
                response.write(
                    `data: ${JSON.stringify({ persons: persons })}\n\n`,
                )
            })
        } catch (error) {
            logger.info(
                `Failed to write to client (${error.message}), removing...`,
            )
            unregisterClient(response)
        }
    })
}

const deletePerson = (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id, { lean: true })
        .then(() => {
            notifyClients()
            response.status(204).end()
        })
        .catch((error) => next(error))
}

const getPerson = (request, response, next) => {
    const id = request.params.id
    // noinspection JSCheckFunctionSignatures
    Person.findById(id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
}
const getAllPersons = (request, response) => {
    // noinspection JSCheckFunctionSignatures
    Person.find({}).then((persons) => {
        response.json(persons)
    })
}
const addPerson = (request, response, next) => {
    const body = request.body
    if (!body) {
        response
            .status(400)
            .json({ error: 'no data for person provided' })
            .end()
        return
    }
    const { name, phoneNumber } = body
    const person = new Person({ name, phoneNumber })

    // TODO prevent storing a person as new if a person with the same name exists already => return response.status(400).json({error: 'person already exists'})

    person
        .save()
        .then((savedPerson) => {
            logger.info('person saved!', savedPerson)
            response.json(savedPerson)
            notifyClients()
        })
        .catch((error) => next(error))
}
const getStatusInfo = (request, response) => {
    // noinspection JSCheckFunctionSignatures
    Person.find({}).then((persons) => {
        response.send(
            `Phonebook has info for ${persons.length} people<br/>${new Date().toString()}`,
        )
    })
}

const provideUpdates = (request, response) => {
    logger.info('provideUpdates')
    response.setHeader('Content-type', 'text/event-stream')
    response.setHeader('Cache-Control', 'no-cache')
    response.setHeader('Connection', 'keep-alive')

    request.on('close', () => {
        logger.info('Client disconnected')
        unregisterClient(response)
    })

    request.on('aborted', () => {
        logger.info('Client aborted connection')
        unregisterClient(response)
    })

    registerClient(response)
}

const updatePerson = (request, response, next) => {
    const body = request.body
    const id = request.params.id

    if (!body || !body.name) {
        response.status(400).json({
            error: 'name missing',
        })
        return
    }

    // noinspection JSCheckFunctionSignatures
    Person.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
}

personsRouter.get('/updates', provideUpdates)
personsRouter.get('/info', getStatusInfo)
personsRouter.delete('/:id', deletePerson)
personsRouter.put('/:id', updatePerson)
personsRouter.get('/:id', getPerson)
personsRouter.get('/', getAllPersons)
personsRouter.post('/', addPerson)

module.exports = personsRouter
