import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import WeatherDetails from './pages/WeatherDetails'
import Home from './pages/Home'
import Layout from './components/Layout'
import Register from './pages/Register'
import Login from './pages/Login'

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
  const [showWeatherCard, setShowWeatherCard] = useState(false)
  const [showQuote, setShowQuote] = useState(true)
  const [bgImg, setBgImg] = useState("url('bg-photos/bgImg.png')")
  const [bgColor,setBgColor]=useState('')

  return (
    <Layout weatherObj={weatherObj} bgImg={bgImg} setBgImg={setBgImg} bgColor={bgColor} setBgColor={setBgColor}>
      <Routes>
        <Route path="/" element={<Home weatherObj={weatherObj} setWeatherObj={setWeatherObj} showWeatherCard={showWeatherCard} setShowWeatherCard={setShowWeatherCard} bgColor={bgColor} setBgColor={setBgColor} bgImg={bgImg} setBgImg={setBgImg} showQuote={showQuote} setShowQuote={setShowQuote} />}></Route>
        <Route path="/:cityname" element={<WeatherDetails setBgColor={setBgColor} setBgImg={setBgImg} />}></Route>
        <Route path="/register" element={<Register setBgColor={setBgColor} setBgImg={setBgImg} />}></Route>
        <Route path="/login" element={<Login setBgColor={setBgColor} setBgImg={setBgImg}/>}></Route>
      </Routes>
    </Layout>
  )
}

export default App
