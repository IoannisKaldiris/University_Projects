import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// React Router
import { RouterProvider } from 'react-router-dom';
import router from './utils/router';

// Chatora UI
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './utils/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
