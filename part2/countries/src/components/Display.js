const Display = ({ countryToShow }) => {
    if (countryToShow.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } 
    
    else if (countryToShow.length > 1 && countryToShow.length <= 10) {
        return (
            <div>
                {countryToShow.map(country =>
                    <MatchCountries key={country.cca3} country={country} />
                )}
            </div>
        )
    }
    
    else if (countryToShow.length === 1){
        return(
            <CountryInformation country={countryToShow[0]} />
        )
    }
    
    else{
        return <p></p>
    }
}

const MatchCountries = ({ country }) => {
    return (
        <p>{country.name.common}</p>
    )
}

const CountryInformation = ({country}) => {
    console.log(country)
    console.log(country.languages)
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
        </div>
    )
}

export default Display