const Filter = ({filterName, filterContactName}) => {
    return (
        <form>
            <div>
                filter shown with
                <input
                    value={filterName}
                    onChange={filterContactName}
                />
            </div>
        </form>
    )
}

export default Filter