import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../axiosInstance';

import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Grid, Typography, Container
} from '@mui/material';
import { blue } from '@mui/material/colors';

const Login = () => {
  // const { setUser, setToken } = useAuthContext()
  let navegate = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    axiosInstance
      .post(`user/login/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log('===== Login -- res.data', res.data );
        console.log('===== Login -- res.data.tokens', res.data.tokens);
        console.log('===== Login -- res.data.tokens', res.data.tokens.access);
        console.log('===== Login -- res.data.tokens', res.data.tokens.refresh);
        // setUser()

        localStorage.setItem('username', res.data.username);
        localStorage.setItem('access_token', res.data.tokens.access);
        localStorage.setItem('refresh_token', res.data.tokens.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');

          // blogauthor
        navegate(`/dashboard/`)
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        // 		marginTop: theme.spacing(8),
        >
          <Avatar sx={{ bgcolor: blue[500] }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form style={{ width: '100%' }}
            // 		marginTop: theme.spacing(1),
            noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // style={{width:'100%'}}
              // 		margin: theme.spacing(3, 0, 2),
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}

export default Login
