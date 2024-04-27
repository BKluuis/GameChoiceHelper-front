import { useState } from 'react';
import AuthContext from './Auth';
import { RouterProvider } from 'react-router-dom';
import router from '../Routing/routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './Theme';


function App() {
  const [user, setUser] = useState();
  const userValue = {user, setUser};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AuthContext.Provider value={userValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
