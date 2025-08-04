import { useEffect, useState } from 'react'
import personService from './services/persons'
import { Button } from './components/Button.jsx'

const handleWith = handler => (event) => handler(event.target.value)


const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            filter shown with <input id="filterInputField"
                onChange={handleWith(setFilter)}
                value={filter}/>
        </div>
    )
}

const NewPersonForm = ({ persons, setPersons, successMessage, errorMessage }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const byName = (searchName) => (candidate) =>
        candidate.name === searchName

    const updatePerson = (existingPerson) => {
        console.log('update ', { existingPerson }, ' requested')
        personService
            .update(existingPerson.id, {
                name: newName,
                phoneNumber: newNumber
            })
            .then(updatedPerson => {
                setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                successMessage(`updated ${newName}`)
            })
            .catch(error => {
                console.log('error while updating person: ', error)
                errorMessage(`${newName} could not be updated: ${error.response.data.error}`)
            })
    }

    function createPerson() {
        personService
            .create({
                name: newName,
                phoneNumber: newNumber
            })
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                successMessage(`added ${newName}`)
            })
            .catch(error => {
                console.log('error while creating person: ', error)
                errorMessage(`${newName} could not be added: ${error.response.data.error}`)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(byName(newName))
        let operationSuccessful = false
        if (existingPerson !== undefined) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updatePerson(existingPerson)
                operationSuccessful = true
            }
        } else {
            createPerson()
            operationSuccessful = true
        }
        if (operationSuccessful) {
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input id="newNameInputField"
                    onChange={handleWith(setNewName)}
                    value={newName}/><br/>
                number: <input id="newNumberInputField"
                    onChange={handleWith(setNewNumber)}
                    value={newNumber}/><br/>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({ person, handleDeletePerson }) => {

    return (
        <div>
            {person.name} {person.phoneNumber}  &nbsp;&nbsp;&nbsp; <Button onClick={handleDeletePerson} text='delete'/>
        </div>
    )
}

const ListOfPersons = ({ persons, setPersons, successMessage, errorMessage, filter }) => {
    const byPartialName = (searchName) => (arrayEntry) =>
        arrayEntry.name.toLowerCase().includes(searchName.toLowerCase())

    const deletePerson = (personToBeDeleted) => () => {
        console.log(`delete ${personToBeDeleted.name} requested`)
        if (!window.confirm(`delete ${personToBeDeleted.name}?`)) return
        personService
            .deleteId(personToBeDeleted.id)
            .then(deletedPerson => {
                console.log('deleted person: ', deletedPerson)
                setPersons(persons.filter(p => p.id !== personToBeDeleted.id))
                successMessage(`deleted ${personToBeDeleted.name}`)
            })
            .catch(error => {
                console.log('error: ', error)
                errorMessage(`error: The person ${personToBeDeleted.name} was already removed from server`)
            })
    }

    console.log('persons', persons)
    if (!persons) return null
    return (
        <div>{
            persons.filter(byPartialName(filter)).map(person =>
                <Person
                    key={person.id}
                    person={person}
                    handleDeletePerson={deletePerson(person)}/>
            )
        }</div>
    )
}

const AddressBook = ({ errorMessage, successMessage }) => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    const fetchPersons = () => {
        console.log('fetch persons')
        personService
            .getAll()
            .then(persons => {
                console.log('persons fetched, total: ', persons.length, '')
                setPersons(persons)
            })
    }

    useEffect(fetchPersons, [])
    useEffect(() => personService.registerAutoUpdateForPersons(setPersons), [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter}/>
            <h2>Add a new</h2>
            <NewPersonForm persons={persons} setPersons={setPersons} successMessage={successMessage} errorMessage={errorMessage} />
            <h2>Numbers</h2>
            <ListOfPersons persons={persons} setPersons={setPersons} successMessage={successMessage} errorMessage={errorMessage} filter={filter}/>
        </div>
    )
}

export default AddressBook