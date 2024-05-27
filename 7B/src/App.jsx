import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}?fullText=true`)
        setCountry({ found: true, data: response.data })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    fetchCountry()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        Not found...
      </div>
    )
  }

  return (
    <div>
      <h2>{country.data.name.common} </h2>
      <div>Capital: {country.data.capital[0]} </div>
      <div>Population: {country.data.population}</div> 
      <img 
        src={country.data.flags.png}
        height='100'
        alt={`flag of ${country.data.name.common}`} 
        style={{ border: '1px solid black' }}
      /> 
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App