import { getFavCitiesById } from '../api/apiClient'
import { useEffect, useState } from 'react'
import WeatherCard from '../components/WeatherCard'
import { useNavigate,Link } from 'react-router-dom'

const FavCities = ({setBgImg,setBgColor}) => {
  const id = localStorage.getItem('userId')
  const [cities, setCities] = useState([])
  const nav=useNavigate()

  useEffect(() => {

    setBgColor('rgb(219 234 254)')
    setBgImg('')

    if (id) {
      async function fetchFavCities() {
        const cities = await getFavCitiesById(id)
        setCities(cities)
      }
      fetchFavCities()
    } else {
      nav('/login')
    }
   
  }, [])

  return <div>{cities.map((city) => 
    
    <Link  key={city} to={`/${city}`}><h1 className="text-xl px-10 py-2 hover:underline">{city}</h1></Link>
  )}</div>
}

export default FavCities
