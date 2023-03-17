import React from 'react'

function covertHour(hour) {
  if (hour.charAt(0) === '0') {
    return hour.charAt(1)+'AM'
  } else if (hour > 12) {
    return hour - 12+'PM'
  } else {
    return hour+'AM'
  }
}

const WeatherByHour = ({ hour }) => {
  const time = hour.time.substring(11, 13)
  const cvtTime = covertHour(time)

  const {
    condition: { icon },
    temp_c,
  } = hour

  return (
    <div className="flex items-center flex-col mb-2  text-sky-600">
      {cvtTime}
      <img className="w-8 h-8" src={`http:${icon}`} alt="weatherIcon" />
      <span className=" text-black">{temp_c}°C</span>
    </div>
  )
}

export default WeatherByHour
