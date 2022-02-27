import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather_data, setWeather_data] = useState(null)

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => setWeather_data(response.data))
    }, [])

    return (
        <div>
            {weather_data &&
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <p>temperature {(weather_data.main.temp - 273.15).toPrecision(4)} Celsius</p>
                    <img src={`http://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`} />
                    <p>wind {weather_data.wind.speed} m/s</p>
                </div>
            }
        </div>
    )
}

export default Weather