import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, onchangeFunc}) => {
  return (
    <div>
      Find Countries <input value={filter} onChange={onchangeFunc}/>
    </div>
  )
}

const Weather = ({capital}) => {

  const [weather, setNewWeather] = useState({})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
        setNewWeather(response.data)
        setLoading(false)
    })
  }, [])
  
  if (isLoading) {
    return <div><p>Loading weather....</p></div>
  }  

  console.log(weather)

  return (
    <div>
        <h3>Weather in {capital}</h3>
        <p>temperature: {weather.main.temp}</p>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
        <p>Wind:{weather.wind.speed}</p>
    </div>
  )
}

const CountryDetails = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Population:</b> {country.population}</p>
      <h3>Spoken languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}> {language} </li>)}
      </ul>
      <img src= {country.flags.png} alt="new"/>
      <Weather capital = {country.capital} />
    </div>
  )
}


const Country = ({country, changeFitlerfunc}) => {
return (
  <div>
    <p>{country.name.common} <button onClick={() => changeFitlerfunc(country.name.common)}>Show</button></p>
  </div>
  )
}


const Countries = ({countries, filter, changeFitlerfunc}) => {

  const countrylist = countries.filter(country => country.name.common.toLocaleUpperCase().includes(filter.toUpperCase()))
  if (countrylist.length > 10){
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  return (
    <div>
      {countrylist.length ===1 ? <CountryDetails country={countrylist[0]}/> : countrylist.map(country => <Country key= {country.name.common} country={country} changeFitlerfunc={changeFitlerfunc}/>)}
    </div>
  )
  
}

function App() {

  const [filter, setNewfilter] = useState('')
  const [countries, setCountries] = useState([]) 
  
  const handleFilter = event => setNewfilter(event.target.value)  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
         <Filter filter={filter} onchangeFunc={handleFilter}/>
         <Countries countries={countries} filter = {filter} changeFitlerfunc = {setNewfilter}/>
    </div>
  );
}

export default App;
