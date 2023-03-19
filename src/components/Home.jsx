import React, { useState, useEffect } from 'react'


import weatherImg from '../data/weather.json'
import Quote from './Quote'
import WeatherCard from './WeatherCard'
import SearchBar from './SearchBar'
import SearchBar2 from './SearchBar2'
import Header from './Header'
import NavBar from './NavBar'

const Home = () => {
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
  const [showWeatherCard,setShowWeatherCard]=useState(false)

  const API_URL = 'https://weatherapi-com.p.rapidapi.com/current.json'

  useEffect(() => {
    // function getRandomIndex(arr) {
    //   const index=Math.floor(Math.random()*arr.length)
    //   return index
    // }
    if (weatherObj.condition.includes('Sunny')) {
      document.body.style.backgroundImage = `url(${weatherImg.sunny})`
      document.body.style.backgroundSize = 'cover'
    } else if (weatherObj.condition.includes('rain')) {
      document.body.style.backgroundImage = `url(${weatherImg.rain})`
      document.body.style.backgroundSize = 'cover'
    } else if (weatherObj.condition.toLowerCase().includes('cloudy')) {
      document.body.style.backgroundImage = `url(${weatherImg.cloudy})`
      document.body.style.backgroundSize = 'cover'
    } else if (weatherObj.condition.includes('Overcast')) {
      document.body.style.backgroundImage = `url(${weatherImg.overcast})`
      document.body.style.backgroundSize = 'cover'
    } else if (weatherObj.condition.includes('snow')) {
      document.body.style.backgroundImage = `url(${weatherImg.snow})`
      document.body.style.backgroundSize = 'cover'
    } else if (weatherObj.condition.includes('Clear')) {
      document.body.style.backgroundImage = `url(${weatherImg.clear})`
      document.body.style.backgroundSize = 'cover'
    } else {
      document.body.style.backgroundImage = `url(${weatherImg.bgImg})`
    }
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
      
      setShowWeatherCard(true)
      setShowQuote(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <NavBar/>
       <Header />
      <main className="flex flex-col items-center">
        {/* search bar */}
        {/* <SearchBar
          searchPlace={searchPlace}
          setSearchPlace={setSearchPlace}
          searchWeather={searchWeather}
        /> */}
        <SearchBar2/>
        {/* weather display card */}
      
        {showWeatherCard && <WeatherCard data={weatherObj} />}
        {showQuote && <Quote />}
      </main>
    </div>
  )
}

export default Home
