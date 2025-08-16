import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router';


function AppHeader() {
  const username = localStorage.getItem('username')
  const InfoUsr_1 = `/dashboard/a/${username}`
  const InfoUsr_2 = `/dashboard/b/`
  const InfoUsr_3 = `/dashboard/c/`
  const color = !username ? "secondary" : "primary"
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color={color}>
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
              <Button href="#" color="inherit" component={NavLink} to={InfoUsr_1} > InfoUsr_1 </Button>
              <Button href="#" color="inherit" component={NavLink} to={InfoUsr_2} > InfoUsr_2 </Button>
              <Button href="#" color="inherit" component={NavLink} to={InfoUsr_3} > InfoUsr_3 </Button>
              <Button href="#" color="inherit" component={NavLink} to="/dashboard/logout"  > Logout </Button>
            </nav>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader
