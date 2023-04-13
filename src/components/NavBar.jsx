import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BiLogIn } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { BsGeoAltFill } from 'react-icons/bs'
import Avatar from '@mui/material/Avatar'
import { IconButton } from '@mui/material'
import { Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import { Logout } from '@mui/icons-material'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { useUserStore } from '../userStore'

import { usePosition } from '../hooks/usePosition'
import {
  getCityByGeocode,
  getWeatherByCity,
  getUserByAuthId
} from '../api/apiClient'


const NavBar = () => {
  const { latitude, longitude } = usePosition()

  const { loginWithRedirect, logout, isAuthenticated, isLoading,user} = useAuth0()

  const nav = useNavigate()

  const [open, setOpen] = useState(false)

  const [currentCity, setCurrentCity] = useState('')
  const [temp, setTemp] = useState('')

  const currentUser = useUserStore((state) => state.currentUser)
  const setUser=useUserStore((state)=>state.setUser)



  async function fetchUser(authId) {
    const userDB = await getUserByAuthId(authId)

    if (userDB) {
      setUser({id:userDB.id, firstName: userDB.firstName, lastName: userDB.lastName })
    } 
  }


  useEffect(() => {
    fetchGeoCity()
    async function fetchWeather(city) {
      const weather = await getWeatherByCity(city)
      setTemp(weather.current.temp_c)
    }

    if (user) {
      fetchUser(user.sub)
    }

    let timer
    if (currentCity) {
      fetchWeather(currentCity)
      timer = setInterval(() => {
        console.log('update nav weather every 60s')
        fetchWeather(currentCity)
      }, 60000)
    }
    return () => clearInterval(timer)
  }, [latitude, longitude, currentCity,user])

  async function fetchGeoCity() {
    const city = await getCityByGeocode(latitude, longitude)
    setCurrentCity(() => city)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  async function showFavCities() {
    if (isAuthenticated) {
      nav('/favorite_cities')
    }
  }

  return (
    <div>
      <nav className="flex items-center px-10 justify-between">
        <Link to={'/'}>
          <div className="flex items-center">
            <div className="w-14 h-14 mt-3">
              <img src="assets/weather-icon.png" alt="weather-logo" />
            </div>
            {currentCity ? (
              <div className="flex items-center text-xl mx-10">
                <BsGeoAltFill className="mr-2  text-sky-500 text-xl" />
                {currentCity} &nbsp;{temp}°C
              </div>
            ) : (
              <div className="flex items-center text-xl mx-10">
                Have a nice day~
              </div>
            )}
          </div>
        </Link>
        <div className="text-xl  flex items-center ">
          <div className="tham tham-e-squeeze tham-w-6 tham-active:opened sm:hidden">
            <div className="tham-box">
              <div className="tham-inner" />
            </div>
          </div>

          {isAuthenticated && !isLoading && currentUser.firstName ? (
            <>
              <span className=" bg-white opacity-70 shadow-neutral-100 p-1">
                Kia ora, {currentUser.firstName}
              </span>
              <IconButton
                className="hover:ring-2 ring-slate-300"
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 40, height: 40 }}>
                  {currentUser.firstName &&
                    Array.from(currentUser.firstName)[0]}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link to={'/profile'}>
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                </Link>
                <MenuItem onClick={showFavCities}>
                  <Avatar>
                    <LocationCityIcon />
                  </Avatar>
                  My favorite cities
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <BiLogIn className="mx-3 text-2xl hidden sm:block" />
              <button
                onClick={() => loginWithRedirect()}
                className="sm:text-base text-sm hidden sm:block rounded-full bg-white px-4 py-1 hover:cursor-pointer shadow-md hover:ring ring-white"
              >
                Log in
              </button>
              <button
                onClick={() =>
                  loginWithRedirect(
                    { redirectUri: `${window.location.origin}/profile` }
                  )
                }
                className="ml-6 sm:text-base hidden sm:block text-sm hover:ring hover:cursor-pointer text-white bg-blue-500 rounded-full px-4 py-1 shadow-md"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
