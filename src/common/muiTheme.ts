import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const muiThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0d7339',
    },
    secondary: {
      main: '#0e5663',
    },
  },
  typography: {
    useNextVariants: true,
  },
};

export default createMuiTheme(muiThemeOptions);
