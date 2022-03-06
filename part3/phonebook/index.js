require('dotenv').config()
const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

//create database module
const Contact = require('./models/note')

//connect front-end (port 3000) with back-end (port 3001)
app.use(cors())

//first check 'build' directory to deploy fullstack on Heroku (to deploy front-end)
app.use(express.static('build'))

//middleware parse data to json format
app.use(express.json())

//--------------middleware morgan----------------
app.use(morgan('tiny'))

app.use(morgan((tokens, request, response) => {
    return tokens.dataPost(request, response)
}))

morgan.token('dataPost', (request, response) => {
    if (request.method !== 'POST') {
        return null;
    }
    return JSON.stringify(request.body)
})
//------------------------------------------------

//hardcoded data
/*let contacts = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]*/

app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
        response.send(
            `<div>
                <p>Phone book has info for ${contacts.length} people</p>
                <p>${new Date()}</p>
            </div>`
        )
    })
})

//fetch all data from database
app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

//fetch data by ID
app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => { next(error) })
})

//delelte data out of database
app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//add new data to database
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })
    }

    const newContact = new Contact({
        name: body.name,
        number: body.number
    })

    newContact.save().then(savedContact => {
        response.json(savedContact)
    })
})

//update existing contact
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const updateContact = {
        name: body.name,
        number: body.number
    }

    Contact.findByIdAndUpdate(request.params.id, updateContact, { new: true })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

//-----middleware handles requests with unknown endpoint-----
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
//-----------------------------------------------------------

//------middleware error handlers (need to be last loaded)------------
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)
//---------------------------------------------------------------------

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})