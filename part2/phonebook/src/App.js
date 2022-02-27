import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [message, setMessage] = useState('Notifications will apear here!')

    //load data from json-server
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
                    .then(response => setPersons(persons.map(person => person.id === response.id ? response : person)))
                    .catch(() => {
                        setMessage(`Information of ${contactObject.name} has already been removed from server!`)
                        setPersons(persons.filter(n => n.id !== existedContact[0].id))
                        setNewName('')
                        setNewNumber('')
                    })

                //toggle update number contact notification for 5 second
                setMessage(`Updated ${contactObject.name}'s phone number!`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
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

            //toggle add contact notification for 5 second
            setMessage(`Added ${contactObject.name}!`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    //tracking change in name input
    const handleContactNameChange = (event) => {
        setNewName(event.target.value)
    }

    //tracking change in number input
    const handleContactNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    //filter search
    const filterContactName = (event) => {
        setFilterName(event.target.value)
    }

    const contactToShow = persons.filter(person => (person.name.toLowerCase()).includes(filterName.toLowerCase()))

    //deleteContact handle
    const handleDelete = (person) => {
        //console.log(person.id)
        if (window.confirm(`Delete ${person.name}?`)) {
            //console.log(person.id, 'will be delete after clicked')
            personService.ContactDelete(person.id)

            //toggle delete contact notification for 5 second
            setMessage(`Deleted ${person.name}!`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)

            setPersons(persons.filter(n => n.id !== person.id))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} />
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