import React, { useState,useEffect } from 'react'


import Quote from '../components/Quote'
import WeatherCard from '../components/WeatherCard'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'

import { getWeatherByCity } from '../api/apiClient'

const Home = ({weatherObj,setWeatherObj,showWeatherCard,setShowWeatherCard,setBgImg,setBgColor,showQuote,setShowQuote}) => {


  useEffect(() => {

    setBgImg("should have bgImg")
    setBgColor('')
  
  }, [])
  

  const searchWeather = async (city) => {
    try {
      const weather = await getWeatherByCity(city)
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
    <div className="pb-10 bg-cover" >
      <Header />
      <main className="flex flex-col items-center">
        {/* search bar */}
        <SearchBar  
          searchWeather={searchWeather}
        />
        {/* weather display card */}
        {showWeatherCard && <WeatherCard data={weatherObj} />}
        {showQuote && <Quote />}
      </main>
    </div>
  )
}

export default Home
