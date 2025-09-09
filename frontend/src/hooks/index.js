import { useEffect, useState } from 'react'
import countryService from '../services/countries.js'

export const useField = (type, name, placeholder) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
        type,
        name,
        placeholder,
        value,
        onChange,
        onReset
    }
}

export const useCountry = (initialCountryName) => {
    const [country, setCountry] = useState(null)
    const [countryName, setCountryName] = useState(initialCountryName)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await countryService.getByName(countryName)
                console.log(`fetched country '${countryName}'`, response)
                return response
            } catch (error) {
                console.log(`error fetching country '${countryName}'`, error)
                return null
            }
        }
        fetchCountry().then(setCountry)
    }, [countryName])

    return {
        country,
        setCountryName
    }
}