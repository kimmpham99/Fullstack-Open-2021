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
        <div>
            <p>{person.name} {person.number}</p>
        </div>       
    )
}

export default Display