const Display = ({ contactToShow }) => {
    return (
        <div>
            {contactToShow.map(person =>
                <Person key={person.name} person={person} />
            )}
        </div>
    )
}

const Person = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}

export default Display