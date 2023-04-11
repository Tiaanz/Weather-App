import { getFavCitiesById } from '../api/apiClient'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useUserStore } from '../userStore'

const FavCities = ({setBgImg,setBgColor}) => {
  const [cities, setCities] = useState([])
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  
  const currentUser = useUserStore((state) => state.currentUser)

  useEffect(() => {

    setBgColor('rgb(219 234 254)')
    setBgImg('')

    if (isAuthenticated) {
      async function fetchFavCities() {
        const cities = await getFavCitiesById(currentUser.id)
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
