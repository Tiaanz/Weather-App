import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'


import { getUserByAuthId,addUser } from '../api/apiClient'

import { useAuth0 } from '@auth0/auth0-react'
import { useUserStore } from '../userStore'

const theme = createTheme()

export default function Profile({ setBgColor, setBgImg }) {

  const currentUser = useUserStore((state) => state.currentUser)
  const setUser = useUserStore((state) => state.setUser)

  const { user, isLoading } = useAuth0()
  const [open, setOpen] = React.useState(false)
  const [showRegister, setShowRegister] = React.useState(false)

  React.useEffect(() => {
    setBgImg('')
    setBgColor('rgb(219 234 254)')
   
    if (user) {
      fetchUser(user.sub)
    }
  }, [user])

  async function fetchUser(authId) {
    const userDB = await getUserByAuthId(authId)

    if (userDB) {
      setUser({id:userDB.id, firstName: userDB.firstName, lastName: userDB.lastName })
    } else {
      setShowRegister(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    let timer
    clearTimeout(timer)
    const newUser = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: user?.email,
      auth0Id: user?.sub,
    }
    console.log(newUser)
    await addUser(newUser)

    setUser({ firstName: newUser.firstName, lastName: newUser.lastName })
    setOpen(true)
    setShowRegister(false)
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {showRegister && !isLoading ? (
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="xs"
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow:
                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Grid item xs={12} sm={16}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      inputProps={{ maxLength: 12 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={16}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      inputProps={{ maxLength: 12 }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        !isLoading && (
          <>
            <Container
              component="main"
              maxWidth="xs"
              style={{
                marginTop: '60px',
                backgroundColor: 'white',
                borderRadius: '20px',
                boxShadow:
                  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              }}
            >
              <h1 className="text-xl text-blue-700 mb-2">Profile</h1>
              <ul>
                <li>
                  {currentUser.firstName}
                  &nbsp;
                  {currentUser.lastName}
                </li>
                <li>{user?.email}</li>
              </ul>
            </Container>
            <Link to={'/'}>
              <div className="w-1/3 my-10 mx-auto text-center hover:underline hover:cursor-pointer text-blue-700 font-medium">
                Go back to Home Page
              </div>
            </Link>
          </>
        )
      )}
    </>
  )
}
