import React, { useState, useEffect } from 'react'
import Weather from './components/Weather'
import Quote from './components/Quote'

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

  // useEffect(() => {
  //   document.body.style.backgroundColor = 'grey'
  // }, [])

  const searchWeather = (city) => async (e) => {
    e.preventDefault()
    try {
      // e.preventDefault()
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
      <h1 className="text-3xl sm:text-4xl my-20 font-header text-center">
        What's the weather today?
      </h1>
      <main className="flex flex-col items-center">
        {/* search bar */}
        <div className="w-full ">
          <form
            className="w-full flex justify-center"
            onSubmit={searchWeather(searchPlace)}
          >
            <div className=" w-3/4 sm:w-3/5 md:w-2/4  lg:w-2/5 flex items-center relative">
              <input
                className=" h-10 px-5 pr-10 rounded-full w-full text-lg sm:text-xl focus:outline-none"
                placeholder="Enter your city"
                type="text"
                value={searchPlace}
                onChange={(e) => setSearchPlace(e.target.value)}
              />
              <button type="submit" className="absolute right-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* weather display card */}
        {showQuote ? (
          <Quote />
        ) : <Weather data={weatherObj} />}
      </main>
    </div>
  )
}

export default App
