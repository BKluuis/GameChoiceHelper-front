import { Alert, Snackbar } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';


export default function LogoutSnackBar({state, setState, onFinish}) {
  const [progress, setProgress] = useState(0);
  let timer = null;

  useEffect(() => {
    if(state.open === true){
      timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 500);
    }

    return () => clearInterval(timer);
  }, [state.open]);

  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {return;}
    setState({...state, open: false});
    onFinish();
  };
  
  return <Snackbar anchorOrigin={{ vertical:'top', horizontal:'right' }} open={state.open} autoHideDuration={6000} onClose={handleClose}> 
          <Alert onClose={handleClose} severity={state.isSuccess ? "success" : "error"} variant="filled" sx={{ width: '100%' }}>
            {state.message}
            <CircularProgress variant="determinate" value={progress} />
          </Alert>
        </Snackbar>
}