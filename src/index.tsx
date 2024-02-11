import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import StoreProvider from './store/provider';
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

  .arrow {
    font-size: 0;
    border-radius: 100px;
  }
  
  .arrow::before {
    font-size: 3rem;
    content: "←";
    padding: 0 .25em;
    display: block;
    
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
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
