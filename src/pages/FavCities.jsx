import { getFavCitiesById } from '../api/apiClient'
import { useEffect, useState } from 'react'
import WeatherCard from '../components/WeatherCard'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const FavCities = ({setBgImg,setBgColor}) => {
  const id = localStorage.getItem('userId')
  const [cities, setCities] = useState([])
  const nav = useNavigate()
  const {isAuthenticated,loginWithRedirect}=useAuth0()

  useEffect(() => {

    setBgColor('rgb(219 234 254)')
    setBgImg('')

    if (isAuthenticated) {
      async function fetchFavCities() {
        const cities = await getFavCitiesById(id)
        setCities(cities)
      }
      fetchFavCities()
    } else {
     loginWithRedirect()
    }
   
  }, [])

  return <div>{cities.map((city) => 
    
    <Link  key={city} to={`/${city}`}><h1 className="text-xl px-10 py-2 hover:underline">{city}</h1></Link>
  )}</div>
}

export default FavCities
