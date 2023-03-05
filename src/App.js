import React, { useState, useEffect } from 'react'

import Weather from './components/Weather'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import Quote from './components/Quote'

import color from './data/color.json'



const App = () => {
  const [weatherObj, setWeatherObj] = useState({
    cityName: '',
    country: '',
    time: '',
    temp: '',
    tempImg: '',
    condition: '',
    feelsLike: '',
    wind: '',
    humidity: '',
    uv: '',
  })
  const [searchPlace, setSearchPlace] = useState('')
  const [showQuote, setShowQuote] = useState(true)

  const API_URL = 'https://weatherapi-com.p.rapidapi.com/current.json'

  useEffect(() => {
    function getRandomIndex(arr) {
      const index=Math.floor(Math.random()*arr.length)
      return index
    }
    
    const randomIndex = getRandomIndex(color.colors)
    const bgColor=color.colors[randomIndex]
    document.body.style.backgroundColor = `${bgColor}`
  }, [weatherObj])

  const searchWeather = async (city) => {
    try {
      const response = await fetch(`${API_URL}?q=${city}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      })
      const weather = await response.json()
      const {
        location: { name, country, localtime },
        current: {
          temp_c,
          wind_kph,
          humidity,
          feelslike_c,
          uv,
          condition: { text, icon },
        },
      } = weather
      const imgSrc = `http:${icon}`

      setWeatherObj({
        cityName: name,
        country,
        time: localtime,
        temp: temp_c,
        tempImg: imgSrc,
        condition: text,
        feelsLike: feelslike_c,
        wind: wind_kph,
        humidity,
        uv,
      })
      setShowQuote(false)
    } catch (error) {
      console.log('wrong~~')
    }
  }
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center">
        {/* search bar */}
        <SearchBar
          searchPlace={searchPlace}
          setSearchPlace={setSearchPlace}
          searchWeather={searchWeather}
        />
        {/* weather display card */}
        {showQuote ? <Quote /> : <Weather data={weatherObj} />}
      </main>
    </div>
  )
}

export default App
