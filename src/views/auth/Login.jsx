import { useState, useEffect } from 'react';
import { useNavigate, useFetcher, Form } from 'react-router';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Grid, Typography, Container, Alert
} from '@mui/material';
import { blue } from '@mui/material/colors';

const Login = () => {
  let navegate = useNavigate();
  const fetcher = useFetcher()
  const message = fetcher.data?.message
  const message2 = fetcher.data?.response?.statusText
  // console.log(' --Login--- fetcher ---- ', fetcher)

  if (localStorage.getItem('username')) {
    navegate(`/dashboard/`)
  }

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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <Avatar sx={{ bgcolor: blue[500] }} />
          {message &&
            <Alert severity="info">
              {message2}😞
            </Alert>
          }
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <fetcher.Form method="post"
          // 		marginTop: theme.spacing(1),
          >
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
          </fetcher.Form>
        </div>
      </Container>
    </>
  )
}

export default Login
