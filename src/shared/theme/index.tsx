import {createTheme} from '@mui/material';
import {ptBR} from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#08002a',
        light: '#2f2c53',
        dark: '#000000',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#78d98a ',
        light: '#abffbb',
        dark: '#45a75c',
        contrastText: '#000000',
      },
      error: {
        main: '#F50000',
        light: '#F73333',
        dark: '#AB0000',
      },
      warning: {
        main: '#FFAC33',
        light: '#FF9800',
        dark: '#B26A00',
      },
      success: {
        main: '#33B673',
        light: '#00A451',
        dark: '#007238',
      },
      info: {
        main: '#018781',
        light: '#339F9A',
        dark: '#005E5A',
      },
      text: {
        primary: '#414141',
      },
      background: {
        default: '#F8F8F8',
        paper: '#FFFFFF',
      },
    },
  },
  ptBR,
);
