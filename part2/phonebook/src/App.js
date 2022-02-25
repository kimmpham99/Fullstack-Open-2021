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
            window.alert(`${newName} is already added to phonebook`)
        } else {
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
        //console.log(event.target.value)
        setFilterName(event.target.value)
    }

    const contactToShow = persons.filter(person => (person.name.toLowerCase()).includes(filterName.toLowerCase()))

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
            <Display contactToShow={contactToShow} />
        </div>
    )
}

export default App