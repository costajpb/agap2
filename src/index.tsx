import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import ReduxProvider from './services/redux-provider';
import {
  defaultTheme,
  ThemeProvider,
  createGlobalStyle,
  Preflight,
  th
} from '@xstyled/styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${th.color('warm-gray-200')};
    font-family: ${th.font('mono')};
  }
`

const theme = {
  ...defaultTheme,
  // Customize your theme here
}

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />
      <ReduxProvider>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
