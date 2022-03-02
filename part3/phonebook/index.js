const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

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

let persons = [
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
]

app.get('/info', (request, response) => {
    response.send(
        `<div>
            <p>Phone book has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
    //console.log()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person =>
        person.id === id ?
            null :
            person
    )

    response.status(204).end()
})

app.use(express.json())

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    }

    const newContact = {
        name: body.name,
        number: body.number,
        id: getRandomInt(Math.pow(10, 9))
    }

    persons = persons.concat(newContact)
    response.json(newContact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})