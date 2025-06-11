import {useState, useEffect} from "react";
import countryService from "./services/countries";
import weatherService from "./services/openweathermap";

const SelectionInput = ({countryName, setCountryName}) => {

    const handleInput = (event) => {
        setCountryName(event.target.value)
    }

    const defaultCountry = countryName || ''

    return (
        <div>
            find countries: <input defaultValue={defaultCountry} onChange={handleInput}/>
        </div>
    )
}
const Flag = ({flag}) => {
    return (
        <img src={flag.png} alt={flag.alt} width="200"/>
    )
}
const CountryDescription = ({country}) => {
    if ( ! country) {
        return null
    }
    const languages = country.languages
    return (
         <div>
             <h1>{country.name.official}</h1>
             Capital {country.capital.join(', ')} <br/>
             area {country.area} km2
             <h2>Languages</h2>
             <ul>
                 {Object.keys(languages).map(languageKey => (
                      <li key = {languageKey}>
                          {languages[languageKey]}
                     </li>
                     ))
                 }
             </ul>
             <Flag flag={country.flags}/>
         </div>
     )
}

const loadWeatherForCountry = (country, setWeather) => {
    if (!country) {return () => setWeather(null)}
    const [lat, long] = country.capitalInfo.latlng
    const weather = weatherService.getWeatherForCoordinates(lat, long)
    weather.then(weather => {
        console.log(weather)
        setWeather(weather)
    })
    return () => setWeather(null)
}

const WeatherInCountry = ({country}) => {
    const [weather, setWeather] = useState(null)
    useEffect(()=>loadWeatherForCountry(country, setWeather), [country])

    if (!country) {
        return null
    }
    if (weather === null) {
        return <div>Loading weather...</div>
    }

    const city = country.capital[0]
    const district = weather.name
    const temperature = weather.main.temp
    const weatherIcon = weatherService.getWeatherIconUrl(weather)
    const weatherDescription = weather.weather[0].description
    const wind = weather.wind.speed
    const windKmh = Math.round(wind * 3.6)

    return (
        <div>
            <h2>Weather in {city}, {district}</h2>
            Temperature {temperature}&deg;C<br/>
            <img src={weatherIcon} alt={weatherDescription} width="200"/><br/>
            Wind {wind} m/s ({windKmh} km/h)
        </div>
    )

}

const CandidateList = ({countries, setSelectedCountry}) => {
    if (countries === null || countries.length === 1) return null

    if (countries.length < 11 ) {
        return (
            <div>
            {countries.map(country => (
                <div key = {country.name.common}>
                    {country.name.common} &nbsp; &nbsp; &nbsp;
                    <button onClick={() => setSelectedCountry(country)}>show</button><br/>
                </div>
            ))}
            </div>
        )
    }
    return (
        <div>
            Too many matches, specify another filter
        </div>
    )
}

const CountryInfo = () => {
    const [countryName, setCountryName] = useState(null)
    const [countries, setCountries] = useState(null)
    const [candidates, setCandidates] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)

    const fetchCountries = () => {
        console.log('fetch countries')
        countryService
            .getAll()
            .then(countries => {
                console.log('countries fetched, total: ', countries.length, '')
                setCountries(countries)
            })
    }
    const updateCandidates = () => {
        const searchString = countryName ? countryName.toLowerCase() : ''
        const matchingCountries = countries ? countries.filter(country =>
            country.name.common.toLowerCase().includes(searchString)) : null
        setCandidates(matchingCountries)
        if (matchingCountries && matchingCountries.length === 1) {
            setSelectedCountry(matchingCountries[0])
        } else {
            setSelectedCountry(null)
        }
    }

    useEffect(fetchCountries, [])
    useEffect(updateCandidates, [countryName, countries])

    return (
        <div>
            <h1>Country Info</h1>
            <SelectionInput countryName={countryName} setCountryName={setCountryName}/>
            <CandidateList countries={candidates} setSelectedCountry={setSelectedCountry}/>
            <CountryDescription country={selectedCountry} />
            <WeatherInCountry country={selectedCountry}/>
        </div>
    )
}

export default CountryInfo