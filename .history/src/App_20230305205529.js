import React, { useState, useEffect } from 'react'
// import Weather from './components/Weather'
import Quote from './components/Quote'

const App = () => {
  const [searchPlace, setSearchPlace] = useState('')
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [time, setTime] = useState('')
  const [temp, setTemp] = useState('')
  const [tempImg, setTempImg] = useState('')
  const [condition, setCondition] = useState('')
  const [feelsLike, setfeelsLike] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [uv, setUv] = useState('')
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
      const weatherObj = await response.json()
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
      } = weatherObj
      const imgSrc = `http:${icon}`

      setCityName(name)
      setCountry(country)
      setTime(localtime)
      setTemp(temp_c)
      setTempImg(imgSrc)
      setCondition(text)
      setfeelsLike(feelslike_c)
      setWind(wind_kph)
      setHumidity(humidity)
      setUv(uv)
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
      {showQuote ? <Quote/>:<div className="my-10 px-10 w-3/4 sm:w-3/5 md:w-2/4 lg:w-2/5  border rounded-2xl min-w-fit">
          <h2 className="text-3xl sm:text-4xl my-6  ">
            {cityName}, {country}
          </h2>

          <div className="flex items-center">
            <span className="text-5xl">{temp}°C</span>
            <img className="mx-10" src={tempImg} alt="" />
            <p className="text-2xl sm:text-3xl">{condition}</p>
          </div>
          <p className="text-2xl sm:text-3xl">Feels like: {feelsLike}°C</p>
          <div className="text-2xl leading-9 mt-10">
            <div className="flex">
              <span className="mr-3">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 15H18.5C20.43 15 22 16.57 22 18.5C22 20.43 20.43 22 18.5 22C16.57 22 15 20.43 15 18.5V18"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H18.5C20.42 12 22 10.43 22 8.5C22 6.58 20.42 5 18.5 5C16.58 5 15 6.57 15 8.5V9"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 9H9.31C10.8 9 12 7.79 12 6.31C12 4.82 10.79 3.62 9.31 3.62C7.82 3.62 6.62 4.83 6.62 6.31V6.69"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p>Wind: {wind}kph</p>
            </div>
            <div className="flex">
              <span className="mr-3">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,6.36c2,2.58,4,5.87,4,7.64a4,4,0,0,1-8,0c0-1.77,2-5.06,4-7.64M12,3.2S6,10,6,14a6,6,0,0,0,12,0c0-4-6-10.8-6-10.8Z" />
                  <rect width="24" height="24" fill="none" />
                </svg>
              </span>
              <p>Humidity: {humidity}%</p>
            </div>
            <div className="flex">
              <span className="mr-3">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.75C10.8628 17.75 9.75106 17.4128 8.80547 16.781C7.85989 16.1491 7.1229 15.2511 6.6877 14.2004C6.25249 13.1498 6.13862 11.9936 6.36049 10.8782C6.58235 9.76284 7.12999 8.73829 7.93414 7.93414C8.73829 7.12999 9.76284 6.58235 10.8782 6.36049C11.9936 6.13862 13.1498 6.25249 14.2004 6.6877C15.2511 7.1229 16.1491 7.85989 16.781 8.80547C17.4128 9.75106 17.75 10.8628 17.75 12C17.7474 13.5242 17.1407 14.9852 16.0629 16.0629C14.9852 17.1407 13.5242 17.7474 12 17.75ZM12 7.75C11.1594 7.75 10.3377 7.99926 9.63883 8.46626C8.93992 8.93325 8.39519 9.59701 8.07351 10.3736C7.75184 11.1502 7.66768 12.0047 7.83167 12.8291C7.99565 13.6536 8.40043 14.4108 8.9948 15.0052C9.58917 15.5996 10.3464 16.0044 11.1709 16.1683C11.9953 16.3323 12.8498 16.2482 13.6264 15.9265C14.403 15.6048 15.0668 15.0601 15.5337 14.3612C16.0007 13.6623 16.25 12.8406 16.25 12C16.2474 10.8736 15.7987 9.79417 15.0023 8.99772C14.2058 8.20126 13.1264 7.75264 12 7.75Z"
                    fill="#000000"
                  />
                  <path
                    d="M12 5C11.8019 4.99741 11.6126 4.91756 11.4725 4.77747C11.3324 4.63737 11.2526 4.44811 11.25 4.25V2.75C11.25 2.55109 11.329 2.36032 11.4697 2.21967C11.6103 2.07902 11.8011 2 12 2C12.1989 2 12.3897 2.07902 12.5303 2.21967C12.671 2.36032 12.75 2.55109 12.75 2.75V4.25C12.7474 4.44811 12.6676 4.63737 12.5275 4.77747C12.3874 4.91756 12.1981 4.99741 12 5Z"
                    fill="#000000"
                  />
                  <path
                    d="M12 22C11.8019 21.9974 11.6126 21.9176 11.4725 21.7775C11.3324 21.6374 11.2526 21.4481 11.25 21.25V19.75C11.25 19.5511 11.329 19.3603 11.4697 19.2197C11.6103 19.079 11.8011 19 12 19C12.1989 19 12.3897 19.079 12.5303 19.2197C12.671 19.3603 12.75 19.5511 12.75 19.75V21.25C12.7474 21.4481 12.6676 21.6374 12.5275 21.7775C12.3874 21.9176 12.1981 21.9974 12 22Z"
                    fill="#000000"
                  />
                  <path
                    d="M21.25 12.75H19.75C19.5511 12.75 19.3603 12.671 19.2197 12.5303C19.079 12.3897 19 12.1989 19 12C19 11.8011 19.079 11.6103 19.2197 11.4697C19.3603 11.329 19.5511 11.25 19.75 11.25H21.25C21.4489 11.25 21.6397 11.329 21.7803 11.4697C21.921 11.6103 22 11.8011 22 12C22 12.1989 21.921 12.3897 21.7803 12.5303C21.6397 12.671 21.4489 12.75 21.25 12.75Z"
                    fill="#000000"
                  />
                  <path
                    d="M4.25 12.75H2.75C2.55109 12.75 2.36032 12.671 2.21967 12.5303C2.07902 12.3897 2 12.1989 2 12C2 11.8011 2.07902 11.6103 2.21967 11.4697C2.36032 11.329 2.55109 11.25 2.75 11.25H4.25C4.44891 11.25 4.63968 11.329 4.78033 11.4697C4.92098 11.6103 5 11.8011 5 12C5 12.1989 4.92098 12.3897 4.78033 12.5303C4.63968 12.671 4.44891 12.75 4.25 12.75Z"
                    fill="#000000"
                  />
                  <path
                    d="M6.50001 7.24995C6.30707 7.2352 6.12758 7.14545 6.00001 6.99995L4.91001 5.99995C4.83844 5.92838 4.78167 5.84341 4.74293 5.7499C4.7042 5.65639 4.68427 5.55617 4.68427 5.45495C4.68427 5.35373 4.7042 5.25351 4.74293 5.16C4.78167 5.06649 4.83844 4.98152 4.91001 4.90995C4.98158 4.83838 5.06655 4.78161 5.16006 4.74287C5.25357 4.70414 5.3538 4.6842 5.45501 4.6842C5.55623 4.6842 5.65645 4.70414 5.74996 4.74287C5.84347 4.78161 5.92844 4.83838 6.00001 4.90995L7.00001 5.99995C7.123 6.13746 7.19099 6.31547 7.19099 6.49995C7.19099 6.68443 7.123 6.86244 7.00001 6.99995C6.87244 7.14545 6.69295 7.2352 6.50001 7.24995Z"
                    fill="#000000"
                  />
                  <path
                    d="M18.56 19.31C18.4615 19.3104 18.3638 19.2912 18.2728 19.2534C18.1818 19.2157 18.0993 19.1601 18.03 19.09L17 18C16.9332 17.86 16.9114 17.7028 16.9376 17.5499C16.9638 17.3971 17.0368 17.2561 17.1465 17.1464C17.2561 17.0368 17.3971 16.9638 17.55 16.9376C17.7028 16.9113 17.8601 16.9331 18 17L19.09 18C19.2305 18.1406 19.3094 18.3312 19.3094 18.53C19.3094 18.7287 19.2305 18.9194 19.09 19.06C19.0233 19.1355 18.9419 19.1967 18.8508 19.2397C18.7597 19.2827 18.6607 19.3066 18.56 19.31Z"
                    fill="#000000"
                  />
                  <path
                    d="M17.5 7.24995C17.3071 7.2352 17.1276 7.14545 17 6.99995C16.877 6.86244 16.809 6.68443 16.809 6.49995C16.809 6.31547 16.877 6.13746 17 5.99995L18 4.90995C18.1445 4.76541 18.3406 4.6842 18.545 4.6842C18.7494 4.6842 18.9455 4.76541 19.09 4.90995C19.2345 5.05449 19.3158 5.25054 19.3158 5.45495C19.3158 5.65936 19.2345 5.85541 19.09 5.99995L18 6.99995C17.8724 7.14545 17.6929 7.2352 17.5 7.24995Z"
                    fill="#000000"
                  />
                  <path
                    d="M5.44001 19.31C5.34147 19.3104 5.24383 19.2912 5.15282 19.2534C5.06181 19.2157 4.97926 19.1601 4.91001 19.09C4.76956 18.9494 4.69067 18.7587 4.69067 18.56C4.69067 18.3612 4.76956 18.1706 4.91001 18.03L6.00001 17C6.13997 16.9331 6.2972 16.9113 6.45006 16.9376C6.60293 16.9638 6.7439 17.0368 6.85357 17.1464C6.96324 17.2561 7.03621 17.3971 7.06244 17.5499C7.08866 17.7028 7.06685 17.86 7.00001 18L6.00001 19.09C5.92728 19.1638 5.83985 19.2216 5.74338 19.2595C5.64691 19.2974 5.54356 19.3146 5.44001 19.31Z"
                    fill="#000000"
                  />
                </svg>
              </span>
              <p>UV: {uv}</p>
            </div>
          </div>
          <span className="flex justify-end">Local time: {time}</span>
        </div>}
        
      </main>
    </div>
  )
}

export default App
