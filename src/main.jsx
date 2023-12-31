import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';

const styles = {
  global: (props) => ({
    body: {
      bg: mode('red.100', '#000')(props),
      color: mode('red.800', 'whiteAlpha.900')(props),
    },
  }),
};

// Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
    <ChakraProvider theme={theme}>
       <App />
    </ChakraProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
