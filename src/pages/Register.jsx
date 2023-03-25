import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import weatherImg from '../data/weather.json'
import { addUser } from '../api/apiClient'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function Register() {


  const [emailMessage, setEmailMessage] = React.useState('')
  const [passwordMessage, setPswMessage] = React.useState('')
  const [emailInput, setEmailInput] = React.useState('')
  const [pswInput,setPswInput]=React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    document.body.style.backgroundImage = `url(${weatherImg.bgImg})`
 
  }, [])


//validate the email address
const validEmailRegex =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//validate the password
const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)
    
    if (data.get('email').match(validEmailRegex) && data.get('password').match(validPasswordRegex)) {
     
      const newUser = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
      }
      console.log(newUser)
      await addUser(newUser)
      navigate('/')
    } else {
      if (!data.get('email').match(validEmailRegex)&&!data.get('password').match(validPasswordRegex)) {
        setEmailMessage(() => 'Please enter a correct email address')
        setPswMessage(()=>'Password must contain at least 8 characters with letters and numbers')
      } else {
        if (!data.get('email').match(validEmailRegex)) {
          setEmailMessage(() => 'Please enter a correct email address')
        } else {
          setPswMessage(()=>'Password must contain at least 8 characters with letters and numbers')
        }
      }
    }
  }

  return (
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                 
                  onChange={()=>setEmailMessage('')}
                />
              </Grid>
              <p className="text-red-500 ml-5">{emailMessage}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={()=>setPswMessage('')}
                />
              </Grid>
              <p className="text-red-500 ml-5">{passwordMessage}</p>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to={'/login'}
                  className="text-slate-500 text-sm underline"
                >
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
