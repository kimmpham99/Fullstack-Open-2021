const mongoose = require('mongoose')

const password = process.argv[2]

// New contact
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://kimpa:${password}@cluster0.ecm5s.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

// Create new schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Create Model
const Person = mongoose.model('Person', contactSchema)

if (process.argv.length < 4) {
    // Get all contacts from database
    console.log('phonebook:')
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    // Add new contact from console
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    // Save new contact to database
    person.save().then((result) => {
        // console.log(result)
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
