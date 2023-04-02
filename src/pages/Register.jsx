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
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import weatherImg from '../data/weather.json'
import { addUser } from '../api/apiClient'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Register({setBgColor,setBgImg}) {


  const [emailMessage, setEmailMessage] = React.useState('')
  const [passwordMessage, setPswMessage] = React.useState('')
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setBgImg("")
    setBgColor('rgb(219 234 254)')  
   
 
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
      let timer
      clearTimeout(timer)
      const newUser = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
      }
      console.log(newUser)
      await addUser(newUser)
      setOpen(true);
     timer= setTimeout(() => {
       navigate('/login')
      }, 3000);
     
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          You have been successfully registered!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}
