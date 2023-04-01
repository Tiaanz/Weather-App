import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Link as RLink,useNavigate } from 'react-router-dom'
import { authUser } from '../api/apiClient'

const theme = createTheme()

export default function LogIn({ setBgColor, setBgImg, setLoggedName }) {
  

  const [errorMessage,setErrorMessage]=React.useState('')
  const nav=useNavigate()
  React.useEffect(() => {
    setBgImg('')
    setBgColor('rgb(219 234 254)')
  }, [])


  const handleSubmit = async(event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const loggedUser={
      email: data.get('email'),
      password: data.get('password'),
    }
    const res=await authUser(loggedUser)
    console.log(res);
    if (res.firstName) {
      localStorage.setItem("username", res.firstName)
      // setLoggedName(localStorage.getItem("username"))
       nav('/')
    } else {
      setErrorMessage("Incorrect email or password")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '20px',
            marginTop: 8,
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
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
              onChange={()=>setErrorMessage('')}
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
              onChange={()=>setErrorMessage('')}
            />
            {
              errorMessage && <p className='text-red-500'>Incorrect email or password</p>
            }
            
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
                <RLink
                  to={'/register'}
                  className="text-sm text-blue-600 underline"
                >
                  {"Don't have an account? Sign Up"}
                </RLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
