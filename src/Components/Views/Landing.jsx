import Stack from '@mui/material/Stack';
import { Alert, Box, Button, Snackbar, Typography, useTheme } from '@mui/material';
import { useAuthentication } from '../Auth';
import { useState } from 'react';
import Card from '../Card';


function LogoutSnackBar({state, setState}) {
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {return;}
    setState({...state, open: false});
  };
  
  return <Snackbar anchorOrigin={{ vertical:'top', horizontal:'right' }} open={state.open} autoHideDuration={6000} onClose={handleClose}> 
          <Alert onClose={handleClose} severity={state.isSuccess ? "success" : "error"} variant="filled" sx={{ width: '100%' }}>
            {state.message}
          </Alert>
        </Snackbar>
}

function Landing() {
  const user = useAuthentication({onFail: () => {}});
  const [openSnack, setOpenSnack] = useState({open: false, message: "", isSuccess: false});

  /** Opens snackbar accordingly to the response */
  function logout(e) {
    e.preventDefault();
    fetch("http://localhost:3000/logout", {credentials: "include"})
      .then(res => res.json()
        .then(data => setOpenSnack({open: true, message: data.message, isSuccess: res.ok}))
      );
  }
  

  return (
    <>
      <LogoutSnackBar state={openSnack} setState={setOpenSnack}/>
      <Box height="100vh" display="flex" flexDirection='column' justifyContent="center" alignItems="center" sx={{backgroundImage: (theme) => theme.palette.gradient}}>
        <Card sx={{minWidth: "60%"}} shadowPad={30}>
          <Stack alignItems="center" py="60px" justifyContent="space-around" gap="30px">
              <Typography variant='h1' width="95%" textAlign="center" fontSize="5.3vw">Game Choice Helper</Typography>
              <Stack direction="row" justifyContent="space-between" width="80%">
                <Box>
                  <Typography fontSize="1vw">Don’t know what to play?</Typography>
                  <Typography fontSize="1vw">We can choose for you!</Typography>
                </Box>
                <Button  sx={{backgroundImage: "url(steambutton.png)", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", minWidth: "25vw"}} 
                href='http://localhost:3000/auth/steam'/>
              </Stack>
            </Stack>
        </Card>
        <Button href="http://localhost:3000/user" >user button</Button>
        <Button href="http://localhost:3000/random">Game button</Button>
        <Button href="http://localhost:3000/logout" onClick={logout}>logout button</Button>
      </Box>
    </>
  );
}

export default Landing;
