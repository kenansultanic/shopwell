import { createTheme } from "@mui/material/styles";

const paletteLightMode = {
    mode: 'light',
    primary: {
        light: '#eef2f6',
        main: '#2196f3',
        dark: '#1e88e5'
    },
    secondary: {
        light: '#ede7f6',
        main: '#673ab7',
        dark: '#5e35b1'
    }
};

const paletteDarkMode = {
    mode: 'dark',
    primary: {
        light: '#606060',
        main: '#2196f3',
        dark: '#1e88e5'
    },
    secondary: {
        light: '#1f1f1f',
        main: '#2196f3',
        dark: '#1e88e5'
    },
    background: {
        default: '#282828',
        paper: '#282828'
    }
};

const createCustomTheme = mode => createTheme({
    typography: {
        fontFamily: ['Wix Madefor Text', 'sans-serif'].join(',')
    },
    palette: mode === 'light' ? paletteLightMode : paletteDarkMode
});

export default createCustomTheme;