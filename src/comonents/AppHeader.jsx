import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router';


function AppHeader() {
  const username = localStorage.getItem('username')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {!username ?
              <Button href="#" color="inherit" component={NavLink} to="/" > home </Button>
              :
              <>
                <Button href="#" color="inherit" component={NavLink} to="/" > home </Button>
                <Button href="#" color="inherit" component={NavLink} to="/dashboard" > dashboard </Button>
              </>
            }
          </Typography>
          {!username ?
            <nav>
              <Button href="#" color="inherit" component={NavLink} to="/about" > About </Button>
              <Button href="#" color="inherit" component={NavLink} to="/login" > Login </Button>
              <Button color="textPrimary" href="#" component={NavLink} to="/signup" > signup</Button>
            </nav>
            :
            <nav>
              ---  ({username}) ---
              <Button href="#" color="inherit" component={NavLink} to="/dashboard/media" > Media </Button>
              <Button href="#" color="inherit" component={NavLink} to="/dashboard/logout"  > Logout </Button>
            </nav>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader
