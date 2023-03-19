import React from 'react'
import { Route, Routes } from 'react-router-dom'

import WeatherDetails from './pages/WeatherDetails'
import Home from './components/Home'
import Layout from './components/Layout'
import Register from './pages/Register'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:cityname" element={<WeatherDetails />}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </Layout>
  )
}

export default App
