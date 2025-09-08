import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Authcontext } from '../controllers/Authcontrollers';
import Snackbar from '@mui/material/Snackbar';
import styles from '../styles/videoComponent.module.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Auth() {
  const [username, setUsername] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [messages, setMessages] = React.useState('');
  const [formstate, setformstate] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  
  const { handleRegister, handleLogin } = React.useContext(Authcontext);

  const handleAuth = async () => {
    try {
      setError(''); // Clear previous errors
      
      if (formstate === 0) {
        // Login
        let res = await handleLogin(username, password);
        setMessages(res || "Login successful");
        setOpen(true);
      } else if (formstate === 1) {
        // Register
        let res = await handleRegister(name, username, password);
        setMessages(res || "Registration successful");
        setOpen(true);
        setError("");

        setTimeout(() => {
          setformstate(0);
          setUsername("");
          setpassword("");
          setName("");
        }, 2000);
      }
    } catch (e) {
      console.error('Auth error:', e);
      
      // Handle different error response formats
      let msg = "An error occurred";
      
      if (e?.response?.data?.message) {
        msg = e.response.data.message;
      } else if (e?.response?.data) {
        msg = e.response.data;
      } else if (e?.message) {
        msg = e.message;
      }
      
      setError(msg);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className={styles.splineBackground}>
        <spline-viewer url="https://prod.spline.design/7jeFe4Df3h6JJy-L/scene.splinecode"></spline-viewer>
      </div>
      
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("https://source.unsplash.com/1024x1024/?dark,technology")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          }}
        />

        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square  
          style={{
            background: "rgba(20, 20, 20, 0.6)",
            backdropFilter: "blur(50px)",
            borderRadius: "20px",
            color: "white"
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button 
                variant={formstate === 0 ? "contained" : "outlined"} 
                onClick={() => { setformstate(0); setError(''); }}
              >
                Sign In
              </Button>
              <Button 
                variant={formstate === 1 ? "contained" : "outlined"} 
                onClick={() => { setformstate(1); setError(''); }}
              >
                Sign Up
              </Button>
            </div>
            
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formstate === 1 && (
                <TextField 
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white" } }}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="Fullname"
                  label="Fullname"
                  name="fullname"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              )}
                
              <TextField
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus={formstate === 0}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              
              <TextField
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              {error && <p style={{ color: "red" }}>{error}</p>}

              <FormControlLabel
                control={<Checkbox value="remember" color="default" />}
                label="Remember me"
                sx={{ color: "white" }}
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formstate === 1 ? "Register" : "Sign In"}
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar 
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={messages}
      />
    </ThemeProvider>
  );
}