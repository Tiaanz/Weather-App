import React, { useState, useEffect } from 'react'
import { BiLogIn } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { BsGeoAltFill } from 'react-icons/bs'

// import classNames from 'classnames';

import Modal from '@mui/material/Modal'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IconButton } from '@mui/material'
import { Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import { Logout } from '@mui/icons-material'
import LocationCityIcon from '@mui/icons-material/LocationCity'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { usePosition } from '../hooks/usePosition'
import { getCityByGeocode, getWeatherByCity, authUser,getFavCitiesById  } from '../api/apiClient'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
}
const theme = createTheme()

const NavBar = ({ loggedName, setLoggedName }) => {
  const { latitude, longitude, error } = usePosition()

  const nav=useNavigate()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // const [opened, setOpened] = useState(false)

  const [currentCity, setCurrentCity] = useState('')
  const [temp, setTemp] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const logged = localStorage.getItem('username')
  const id=localStorage.getItem('userId')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const loggedUser = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await authUser(loggedUser)
    console.log(res)
    if (res.firstName) {
      localStorage.setItem("username", res.firstName)
      localStorage.setItem("userId", res.id)
      localStorage.setItem("favCities", res.favCity)
      // setLogged(localStorage.getItem("username"))
      setOpen(false)
    } else {
      setErrorMessage('Incorrect email or password')
    }
  }

  useEffect(() => {
    fetchGeoCity()
    async function fetchWeather(city) {
      const weather = await getWeatherByCity(city)
      setTemp(weather.current.temp_c)
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
  }, [latitude, longitude, currentCity])

  async function fetchGeoCity() {
    const city = await getCityByGeocode(latitude, longitude)
    console.log(city)
    setCurrentCity(() => city)
  }

  
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
   
  }

  const handleLogout = () => {
    // setLogged('')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('favCities')
    nav(0)
  }

 async function showFavCities() {
    if (id) {
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

          {logged ? (
            <>
              <span className=" bg-white opacity-70 shadow-neutral-100 p-1">
                Kia ora, {logged}
              </span>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {Array.from(logged)[0]}
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
                <MenuItem onClick={handleCloseMenu}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={showFavCities}>
                  <Avatar>
                    <LocationCityIcon />
                  </Avatar>
                  My favorite cities
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
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
                onClick={handleOpen}
                className="sm:text-base text-sm hidden sm:block rounded-full bg-white px-4 py-1 hover:cursor-pointer shadow-md hover:ring ring-white"
              >
                Log in
              </button>
              <Link to={'/register'}>
                <button className="ml-6 sm:text-base hidden sm:block text-sm hover:ring hover:cursor-pointer text-white bg-blue-500 rounded-full px-4 py-1 shadow-md">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={() => setErrorMessage('')}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={() => setErrorMessage('')}
                  />
                  {errorMessage && (
                    <p className="text-red-500">Incorrect email or password</p>
                  )}
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to={'/register'}>
                        {"Don't have an account? Register"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  )
}

export default NavBar
