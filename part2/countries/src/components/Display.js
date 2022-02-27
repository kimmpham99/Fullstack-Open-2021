import Weather from "./Weather"

const Display = ({ countryToShow, showCountryInfoHandle, showOnClick }) => {
    if (countryToShow.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    else if (countryToShow.length > 1 && countryToShow.length <= 10) {
        return (
            <div>
                {countryToShow.map(country =>
                    <MatchCountries
                        key={country.cca3}
                        country={country}
                        showCountryInfoHandle={showCountryInfoHandle}
                        showOnClick={showOnClick}
                    />
                )}
            </div>
        )
    }

    else if (countryToShow.length === 1) {
        return (
            <CountryInformation country={countryToShow[0]} />
        )
    }

    else {
        return <p></p>
    }
}

const MatchCountries = ({ country, showCountryInfoHandle, showOnClick }) => {
    if (showOnClick.includes(country.name.common)) {
        return (
            <div>
                <p>
                    {country.name.common}
                    <button onClick={() => showCountryInfoHandle(country)}>
                        hide
                    </button>
                </p>
                <CountryInformation country={country} />
            </div>
        )
    }

    return (
        <div>
            <p>
                {country.name.common}
                <button onClick={() => showCountryInfoHandle(country)}>
                    show
                </button>
            </p>
        </div>
    )
}

const CountryInformation = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>

            <h4>languages:</h4>
            <ul>
                {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
            </ul>

            <img src={country.flags.png} />

            <Weather country={country}/>
        </div>
    )
}

export default Display