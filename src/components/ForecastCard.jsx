import React from 'react'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { BsFillCloudRainFill } from 'react-icons/bs'

import WeatherByHour from './WeatherByHour'

const ForecastCard = ({ forecast }) => {

  const {
    date,
    astro: { sunrise, sunset },
    day: {
      condition: { icon, text },
      maxtemp_c,
      mintemp_c,
      daily_chance_of_rain,
    },
    hour,
  } = forecast
 
  return (
    <>
      <div className="border p-6 box-border mb-4 rounded-3xl bg-slate-100 shadow-lg shadow-blue-400/50">
        <h3 className=" ml-4 text-sm text-left font-header vsm:text-2xl">
          {date}
        </h3>
        <div className="flex flex-col items-center vsm:flex-row">
          <span className=" ml-4 text-xl vsm:text-2xl sm:text-3xl my-3">
            {mintemp_c}°C ~ {maxtemp_c}°C
          </span>
          <img
            className=" mx-6 vsm:mx-10"
            src={`http:${icon}`}
            alt="weatherIcon"
          />
          <p className=" text-lg sm:text-2xl mb-2">{text}</p>
        </div>
        <div className="text-sm vsm:text-base grid grid-cols-4 max-h-44 overflow-auto sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          {hour.map(item => <WeatherByHour key={item.time} hour={item} />)}
        </div>
        <span className=" flex items-center text-sm  vsm:text-base">
          <BsFillCloudRainFill className="my-4 mx-2 vsm:mx-4  text-lg vsm:text-xl  text-sky-600" />
          {daily_chance_of_rain}%
        </span>
        <div className="flex">
          <span className="flex items-center  text-sm vsm:text-base ">
            <FiSunrise className="vsm:mx-4 mx-2 text-2xl vsm:text-xl text-orange-500" />
            Sunrise: {sunrise}
          </span>
          <span className="flex items-center  text-sm vsm:text-base">
            <FiSunset className="vsm:mx-4 mx-2 text-2xl vsm:text-xl text-sky-500" />
            Sunset: {sunset}
          </span>
        </div>
      </div>
    </>
  )
}
export default ForecastCard
