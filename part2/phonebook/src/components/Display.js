const Display = ({ contactToShow, handleDelete }) => {
    return (
        <div>
            {contactToShow.map(person =>
                <Person key={person.name} person={person} handleDelete={handleDelete} />
            )}
        </div>
    )
}

const Person = ({ person, handleDelete }) => {
    return (
        <div>
            <p>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person)}>
                    delete
                </button>
            </p>
        </div>
    )
}

export default Display