import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    //add new contact
    const addContact = (event) => {
        event.preventDefault()

        const contactObject = {
            name: newName,
            number: newNumber
        }

        const check = persons.find(person => person.name === newName)

        if (check != undefined) {

            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const existedContact = persons.filter(person => person.name === contactObject.name)
                //const temp = persons.reduce((result, current) => current.name === contactObject.name? current : result, null)
                //console.log(temp)
                personService
                    .update(existedContact[0].id, contactObject)
                    .then(response => setPersons(persons.map(person => person.id === response.id? response : person)))
                    .catch(error => console.log('update number fail'))
            }
        }

        else {
            personService
                .create(contactObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    //trace change in name input
    const handleContactNameChange = (event) => {
        setNewName(event.target.value)
    }

    //trace change in number input
    const handleContactNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    //filter
    const filterContactName = (event) => {
        setFilterName(event.target.value)
    }

    const contactToShow = persons.filter(person => (person.name.toLowerCase()).includes(filterName.toLowerCase()))

    //delete handle
    const handleDelete = (person) => {
        //console.log(person.id)
        if (window.confirm(`Delete ${person.name}?`)) {
            //console.log(person.id, 'will be delete after clicked')
            personService.ContactDelete(person.id)
            setPersons(persons.filter(n => n.id !== person.id))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filterName={filterName} filterContactName={filterContactName} />

            <h2>add a new</h2>
            <PersonForm
                addContact={addContact}
                newName={newName}
                handleContactNameChange={handleContactNameChange}
                newNumber={newNumber}
                handleContactNumberChange={handleContactNumberChange}
            />

            <h2>Numbers</h2>
            <Display contactToShow={contactToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App