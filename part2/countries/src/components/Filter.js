const Filter = ({filterName, filterCountryName}) => {
    return (
        <form>
            <div>
                find countries
                <input
                    value={filterName}
                    onChange={filterCountryName}
                />
            </div>
        </form>
    )
}

export default Filter