import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('Input country')
    const [showOnClick, setShowOnClick] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(reponse => {
                setCountries(reponse.data)
            })
    }, [])

    //filter search
    const filterCountryName = (event) => {
        setFilterName(event.target.value)
        setShowOnClick([])
    }

    const showCountryInfoHandle = (country) => {
        if (showOnClick.includes(country.name.common)) {
            setShowOnClick(showOnClick.filter(showing_country => showing_country !== country.name.common))
        }

        else {
            setShowOnClick(showOnClick.concat(country.name.common))
        }
    }

    const countryToShow = countries.filter(country => (country.name.common.toLowerCase()).includes(filterName.toLowerCase()))

    return (
        <div>
            <Filter filterName={filterName} filterCountryName={filterCountryName} />
            <Display
                countryToShow={countryToShow}
                showCountryInfoHandle={showCountryInfoHandle}
                showOnClick={showOnClick}
            />
        </div>
    )
}

export default App;
