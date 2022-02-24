const PersonForm = ({addContact, newName, handleContactNameChange, newNumber, handleContactNumberChange}) => {
    return (
        <form onSubmit={addContact}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={handleContactNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={handleContactNumberChange}
                />
            </div>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm