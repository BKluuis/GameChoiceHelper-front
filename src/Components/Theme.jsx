import {createTheme} from '@mui/material';

/** For some reason the typography doesnt work on the other theme, so it needs to be set here */
let theme = createTheme({
  palette: {
    primary: {
      dark: "#171A21",
      main: "#1B2838",
      light: "#2A475E",
      contrastText: "#C7D5E0"
    },
    secondary: {
      main: "#66C0F4"
    },
    text: {
      primary: "#C7D5E0"
    },
  },
  typography: {
    fontFamily: ['Russo One', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    "sans-serif"].join(',')
  },
});

theme = createTheme(theme, {
    palette: {
        gradient: `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`
    },
})

export default theme;