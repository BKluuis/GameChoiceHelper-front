import Stack from '@mui/material/Stack';
import { Box, Button, Typography } from '@mui/material';
import { useAuthentication } from '../Auth';
import Card from '../Card';
import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();
  useAuthentication({onFail: () => {}, onSuccess: () => navigate("/games")});

  return (
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
                href={process.env.REACT_APP_API_STEAM_AUTH}/>
              </Stack>
            </Stack>
        </Card>
      </Box>
  );
}

export default Landing;
