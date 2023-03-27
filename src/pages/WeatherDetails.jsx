import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import ForecastCard from '../components/ForecastCard'

const WeatherDetails = ({setBgColor,setBgImg}) => {
  const { cityname } = useParams()

  const [forecastArr, setForecastArr] = useState([])
  const [nameCity, setNameCity] = useState('')
  const [countryName, setCountryName] = useState('')
  const [isValid, setIsValid] = useState(false)

  const API_URL = 'https://weatherapi-com.p.rapidapi.com/forecast.json'

  useEffect(() => {
    setBgColor('rgb(219 234 254)')
    setBgImg('')

    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}?q=${cityname}&days=3`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          },
        })
        const weather = await response.json()
        const {
          forecast: { forecastday },
          location: { name: name2, country },
        } = weather
        setForecastArr(forecastday)
        setNameCity(name2)
        setCountryName(country)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='pb-14'>
      {nameCity ? (
        <div className="box-border w-5/6 text-center sm:w-4/5 sm:text-left mx-auto ">
          <h1 className="text-2xl my-10 font-header sm:text-3xl sm:mb-20 ">
            {nameCity}, {countryName}
          </h1>
          {forecastArr.map((day) => (
            <ForecastCard key={day.date} forecast={day} />
          ))}
        </div>
      ) : (
        <h1 className="text-2xl my-10 font-header sm:text-3xl sm:mb-20 ">
          Loading...(page might not be found)
        </h1>
      )}
    </div>
  )
}

export default WeatherDetails
