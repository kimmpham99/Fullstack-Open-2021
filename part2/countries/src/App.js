import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
	const [countries, setCountries] = useState([])
	const [filterName, setFilterName] = useState('Input country')

	useEffect(() => {
        console.log('trigger function in useEffect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(reponse => {
                console.log('promise fullfilled')
				console.log(reponse.data)
                setCountries(reponse.data)
            })
    }, [])

	//filter
    const filterCountryName = (event) => {
        setFilterName(event.target.value)
    }

    const countryToShow = countries.filter(country => (country.name.common.toLowerCase()).includes(filterName.toLowerCase()))

	return (
		<div>
            <Filter filterName={filterName} filterCountryName={filterCountryName} />
			<Display countryToShow={countryToShow} />
		</div>
	)
}

export default App;
